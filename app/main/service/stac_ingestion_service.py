import datetime
import json
from typing import Dict, Tuple, List

import requests
import sqlalchemy
from flask import current_app

from app.main.model.public_catalogs_model import PublicCatalog
from .. import db
from ..model.stac_ingestion_model import StacIngestionStatus, StoredSearchParameters
from ..util.get_ip_from_cird_range import get_ip_from_cird_range


def get_all_stac_ingestion_statuses() -> List[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus.query.all()
    return [i.as_dict() for i in a]


def get_stac_ingestion_status_by_id(id: str) -> Dict[any, any]:
    a: StacIngestionStatus = StacIngestionStatus.query.filter_by(id=id).first()
    return a.as_dict()


def _make_stac_ingestion_status_entry(source_stac_api_url: str,
                                      target_stac_api_url: str,
                                      update: bool) -> (int, int):
    print("source_stac_api_url: ", source_stac_api_url)
    public_catalogue_entry: PublicCatalog = PublicCatalog.query.filter(
        PublicCatalog.url == source_stac_api_url).first()

    if public_catalogue_entry is None:
        raise ValueError("Target STAC API URL not found in public catalogs.")
    # stac_search_parameters: StoredSearchParameters = StoredSearchParameters()
    # stac_search_parameters.associated_catalog_id = public_catalogue_entry.id
    stac_ingestion_status: StacIngestionStatus = StacIngestionStatus()
    stac_ingestion_status.source_stac_api_url = source_stac_api_url
    stac_ingestion_status.target_stac_api_url = target_stac_api_url
    stac_ingestion_status.update = update
    stac_ingestion_status.time_started = datetime.datetime.utcnow()
    db.session.add(stac_ingestion_status)
    db.session.commit()
    return stac_ingestion_status.id, public_catalogue_entry.id


def ingest_stac_data_using_selective_ingester(parameters) -> [str, int]:
    source_stac_api_url = parameters['source_stac_catalog_url']
    target_stac_api_url = parameters['target_stac_catalog_url']
    update = parameters['update']
    status_id, associated_catalogue_id = _make_stac_ingestion_status_entry(
        source_stac_api_url, target_stac_api_url, update)

    try:
        stored_search_parameters = StoredSearchParameters()
        stored_search_parameters.associated_catalog_id = associated_catalogue_id
        stored_search_parameters.used_search_parameters = json.dumps(
            parameters)
        db.session.add(stored_search_parameters)
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        # exact same search parameters already exist, no need to store them again
        pass
    finally:
        # roolback if there is an error
        db.session.rollback()

    parameters[
        "callback_endpoint"] = "http://172.17.0.1:5000/stac_ingestion/status/" + str(
            status_id)  # TODO: make this environment variable

    cidr_range_for_stac_selective_ingester = current_app.config[
        'STAC_SELECTIVE_INGESTER_CIDR_RANGE']
    port_for_stac_selective_ingester = current_app.config[
        'STAC_SELECTIVE_INGESTER_PORT']
    protocol_for_stac_selective_ingester = current_app.config[
        'STAC_SELECTIVE_INGESTER_PROTOCOL']

    potential_ips = get_ip_from_cird_range(
        cidr_range_for_stac_selective_ingester, remove_unusable=True)

    for ip in potential_ips:
        print("Trying to connect to: ", ip)
        try:
            response = requests.post(
                protocol_for_stac_selective_ingester + "://" + ip + ":" +
                str(port_for_stac_selective_ingester) + "/ingest",
                json=parameters)
            return response.text, status_id
        except requests.exceptions.ConnectionError:
            continue


def set_stac_ingestion_status_entry(
        status_id: str, newly_stored_collections_count: int,
        newly_stored_collections: List[str], updated_collections_count: int,
        updated_collections: List[str], newly_stored_items_count: int,
        updated_items_count: int,
        already_stored_items_count: int) -> Tuple[Dict[any, any]]:
    # get StacIngestionStatus object with id = status_id
    a: StacIngestionStatus = StacIngestionStatus.query.get(status_id)
    # update the object
    a.newly_stored_collections_count = newly_stored_collections_count
    a.newly_stored_collections = ",".join(newly_stored_collections)
    a.updated_collections_count = updated_collections_count
    a.updated_collections = ",".join(updated_collections)
    a.newly_stored_items_count = newly_stored_items_count
    a.updated_items_count = updated_items_count
    a.already_stored_items_count = already_stored_items_count
    a.time_finished = datetime.datetime.utcnow()

    db.session.add(a)
    db.session.commit()
    return a.as_dict()


def update_all_collections() -> List[Tuple[str, int]]:
    stored_search_parameters: [StoredSearchParameters
                               ] = StoredSearchParameters.query.all()
    return _run_ingestion_task_force_update(stored_search_parameters)


def update_specific_collections_via_catalog_id(catalog_id: int,
                                               collections: [str] = None
                                               ) -> List[Tuple[str, int]]:
    stored_search_parameters: [StoredSearchParameters
                               ] = StoredSearchParameters.query.filter_by(
                                   associated_catalog_id=catalog_id).all()
    stored_search_parameters_to_run = []
    if collections is None or len(collections) == 0:
        stored_search_parameters_to_run = stored_search_parameters
        return _run_ingestion_task_force_update(
            stored_search_parameters_to_run)
    for stored_search_parameter in stored_search_parameters:
        used_search_parameters = json.loads(
            stored_search_parameter.used_search_parameters)
        used_search_parameters_collections = used_search_parameters[
            'collections']
        # if any collection in used_search_parameters_collections is in collections, then add to stored_search_parameters_to_run
        check = any(item in used_search_parameters_collections
                    for item in collections)
        if check:
            stored_search_parameters_to_run.append(stored_search_parameter)

    return _run_ingestion_task_force_update(stored_search_parameters_to_run)


def update_specific_collections_via_catalog_url(catalog_url: str,
                                                collections: [str] = None
                                                ) -> List[Tuple[str, int]]:
    # get the catalog id from the catalog url
    public_catalogue_entry: PublicCatalog = PublicCatalog.query.filter_by(
        url=catalog_url).first()
    if public_catalogue_entry is None:
        raise LookupError("No catalogue entry found for url: " + catalog_url)
    return update_specific_collections_via_catalog_id(
        public_catalogue_entry.id, collections)
    pass


def _run_ingestion_task_force_update(
    stored_search_parameters: [StoredSearchParameters
                               ]) -> List[Tuple[str, int]]:
    responses_from_ingestion_microservice = []
    for i in stored_search_parameters:
        try:
            used_search_parameters = json.loads(i.used_search_parameters)
            used_search_parameters["update"] = True
            microservice_response, work_id = ingest_stac_data_using_selective_ingester(
                used_search_parameters)
            responses_from_ingestion_microservice.append(
                (microservice_response, work_id))
        except ValueError:
            pass
    return responses_from_ingestion_microservice


def remove_stac_ingestion_status_entry(
        status_id: str) -> Tuple[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus.query.filter_by(
        id=status_id).first()
    db.session.delete(a)
    db.session.commit()
    return a.as_dict()
