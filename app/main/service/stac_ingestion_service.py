import imp
import sqlite3

from flask import current_app
from typing import Dict, Tuple
from ..routes import route
from ..model.stac_ingestion_model import StacIngestionStatus
import json
from typing import Dict, Tuple, List
from .. import db, flask_bcrypt
import datetime


def get_all_stac_ingestion_statuses() -> List[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus.query.all()
    for i in a:
        print("Newly stored collections are: ", i.newly_stored_collections)
    return [i.as_dict() for i in a]


def get_stac_ingestion_status_by_id(id: str) -> Dict[any, any]:
    a: StacIngestionStatus = StacIngestionStatus.query.filter_by(id=id).first()
    return a.as_dict()


def make_stac_ingestion_status_entry(source_stac_api_url: str,
                                     target_stac_api_url: str,
                                     update: bool) -> int:
    a: StacIngestionStatus = StacIngestionStatus()
    a.source_stac_api_url = source_stac_api_url
    a.target_stac_api_url = target_stac_api_url
    a.update = update
    a.time_started = datetime.datetime.utcnow()
    db.session.add(a)
    db.session.commit()
    return a.id


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

    # print(type(a))
    # a.newly_stored_collections = "ivica"
    # print(a.newly_stored_collections)
    # print(type(a.newly_stored_collections))
    # a.id = status_id,
    # set time_finished to current time
    # time_finished = datetime.datetime.utcnow(),
    # a.time_finished = time_finished
    # print(type(a.time_finished))
    # a.newly_stored_collections_count = int(24),
    # print(a.newly_stored_collections_count)
    # print(type(a.newly_stored_collections_count))
    # a.newly_stored_collections = ",".join(newly_stored_collections),
    # a.updated_collections_count = updated_collections_count,
    # a.updated_collections = ",".join(updated_collections),
    # a.newly_stored_items_count = newly_stored_items_count,
    # a.updated_items_count = updated_items_count,
    # a.already_stored_items_count = already_stored_items_count

    db.session.add(a)
    db.session.commit()
    return a.as_dict()


def remove_stac_ingestion_status_entry(
        status_id: str) -> Tuple[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus.query.filter_by(
        id=status_id).first()
    db.session.delete(a)
    db.session.commit()
    return a.as_dict()
