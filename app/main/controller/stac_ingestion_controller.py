import sqlalchemy
from flask import request
from flask_restx import Resource
from flask import current_app
import requests
from app.main.util.decorator import admin_token_required
from ..util.dto import StacIngestionStatusDto
from typing import Dict, Tuple
from ..service import stac_ingestion_service

api = StacIngestionStatusDto.api
getDto = StacIngestionStatusDto.stac_ingestion_status_get
postDto = StacIngestionStatusDto.stac_ingestion_status_post


@api.route('/start')
class StacIngestionStatusStart(Resource):

    @api.doc('start stac ingestion status')
    def post(self):
        """Start stac ingestion status."""
        data = request.json
        source_stac_api_url = data['source_stac_api_url']
        target_stac_api_url = data['target_stac_api_url']
        update = data['update']
        status_id = stac_ingestion_service.make_stac_ingestion_status_entry(
            source_stac_api_url, target_stac_api_url, update)

        data["callback_id"] = status_id
        data[
            "callback_endpoint"] = "http://172.17.0.1:5000/stac_ingestion/status/" + str(
                status_id)  # TODO: make this environment variable
        STAC_SELECTIVE_CLONER_ENDPOINT = "http://localhost:8888/ingest"  # TODO: this needs to accept CIDR range and try every ip
        print(data)
        # make a post request to STAC_SELECTIVE_CLONER_ENDPOINT
        stac_selective_cloner_endpoint = requests.post(
            STAC_SELECTIVE_CLONER_ENDPOINT, json=data)
        # get http code from stac_selective_cloner_endpoint
        http_code = stac_selective_cloner_endpoint.status_code
        return {
            "message": stac_selective_cloner_endpoint.text,
            "callback_id": status_id
        }, http_code


@api.route('/status')
class StacIngestionStatus(Resource):

    @api.doc('list_of_stac_ingestion_status')
    def get(self):
        return stac_ingestion_service.get_all_stac_ingestion_statuses()


@api.route('/status/<string:status_id>')
class StacIngestionStatusViaId(Resource):

    @api.doc('get a stac ingestion status via status_id')
    def get(self, status_id):
        try:
            return stac_ingestion_service.get_stac_ingestion_status_by_id(
                status_id), 200
        except AttributeError:
            return {'message': 'No result found'}, 404

    @api.doc('Save a stac ingestion status with specified status_id')
    def post(self, status_id):
        request_data = request.get_json()
        print(request_data)
        newly_stored_collections_count = request_data[
            'newly_stored_collections_count']
        newly_stored_collections = request_data['newly_stored_collections']
        updated_collections_count = request_data['updated_collections_count']
        updated_collections = request_data['updated_collections']
        print(updated_collections)
        newly_stored_items_count = request_data['newly_stored_items_count']
        updated_items_count = request_data['updated_items_count']
        already_stored_items_count = request_data['already_stored_items_count']
        try:
            response = stac_ingestion_service.set_stac_ingestion_status_entry(
                status_id, newly_stored_collections_count,
                newly_stored_collections, updated_collections_count,
                updated_collections, newly_stored_items_count,
                updated_items_count, already_stored_items_count)

            return response, 201
        except sqlalchemy.exc.IntegrityError as e:
            return {
                "message": "Ingestion status already exists"
            }, 409  # TODO: this will never throw already existing as it is updating existing record, make it throw if it does not exist

    @api.doc('Delete a stac ingestion status with specified status_id')
    def delete(self, status_id):
        try:
            return stac_ingestion_service.remove_stac_ingestion_status_entry(
                status_id), 200
        except sqlalchemy.orm.exc.UnmappedInstanceError as e:
            return {'message': 'No result found to delete'}, 404
