from re import I
from flask import request
from flask_restx import Resource
from flask import current_app

from app.main.util.decorator import admin_token_required
from ..util.dto import StacIngestionStatusDto
from typing import Dict, Tuple
from ..service import stac_ingestion_status_service
api = StacIngestionStatusDto.api


@api.route('/')
class StacIngestionStatus(Resource):
    def get(self):
        return stac_ingestion_status_service.get_all_stac_ingestion_statuses()


@api.route('/<string:status_id>')
class StacIngestionStatusViaId(Resource):
    def get(self, status_id):
        return "hello world" + status_id

    def post(self, status_id):

        request_data = request.get_json()
        id = status_id
        newly_stored_collections_count = request_data['newly_stored_collections_count']
        newly_stored_collections = ",".join(
            request_data['newly_stored_collections'])
        updated_collections_count = request_data['updated_collections_count']
        updated_collections = ",".join(request_data['updated_collections'])
        newly_stored_item_count = request_data['newly_stored_item_count']
        updated_items_count = request_data['updated_items_count']
        already_stored_items_count = request_data['already_stored_items_count']

        # print all variables
        print(id)
        print(newly_stored_collections_count)
        print(newly_stored_collections)
        print(updated_collections_count)
        print(updated_collections)
        print(newly_stored_item_count)
        print(updated_items_count)
        print(already_stored_items_count)
        return "hello world" + status_id
       # return stac_ingestion_status_service.create_stac_ingestion_status_entry(request_data)
