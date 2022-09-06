from re import I
from flask import request
from flask_restx import Resource
from flask import current_app

from app.main.util.decorator import admin_token_required
from ..util.dto import StacIngestionStatusDto
from typing import Dict, Tuple
from ..service import stac_ingestion_status_service

api = StacIngestionStatusDto.api
getDto = StacIngestionStatusDto.stac_ingestion_status_get
postDto = StacIngestionStatusDto.stac_ingestion_status_post


@api.route('/')
class StacIngestionStatus(Resource):
    @api.doc('list_of_stac_ingestion_status')
    def get(self):
        return stac_ingestion_status_service.get_all_stac_ingestion_statuses()


@api.route('/<string:status_id>')
class StacIngestionStatusViaId(Resource):
    @api.doc('get a stac ingestion status via id')
    def get(self, status_id):
        return "hello world" + status_id

    @api.doc('Save a stac ingestion status with specified id')
    @api.expect(postDto)
    def put(self, status_id):
        request_data = request.get_json()
        print(request_data)
        newly_stored_collections_count = request_data['newly_stored_collections_count']
        newly_stored_collections = ",".join(
            request_data['newly_stored_collections'])
        updated_collections_count = request_data['updated_collections_count']
        updated_collections = ",".join(request_data['updated_collections'])
        newly_stored_items_count = request_data['newly_stored_items_count']
        updated_items_count = request_data['updated_items_count']
        already_stored_items_count = request_data['already_stored_items_count']

        response = stac_ingestion_status_service.create_stac_ingestion_status_entry(newly_stored_collections_count,
                                                                                    newly_stored_collections,
                                                                                    updated_collections_count,
                                                                                    updated_collections,
                                                                                    newly_stored_items_count,
                                                                                    updated_items_count,
                                                                                    already_stored_items_count)

        return response, 201
