import sqlalchemy
from flask import request
from flask_restx import Resource

from ..service import stac_ingestion_service
from ..util.dto import StacIngestionDto

api = StacIngestionDto.api


@api.route('/update')
class StacIngestion(Resource):

    @api.doc('Update all stored items and collections in the database')
    def get(self):
        return stac_ingestion_service.update_all_ingested_collections_and_items(
        )


@api.route('/start')
class StacIngestionStatusStart(Resource):

    @api.doc('start stac ingestion status')
    @api.expect(StacIngestionDto.start_stac_ingestion, validate=True)
    @api.response(200, "Okay")
    @api.response(
        400,
        "Bad Request - Source stac api url specified is not present in the public_catalogs"
    )
    @api.response(412, "Target STAC API URL not found in public catalogs")
    def post(self):
        """Start stac ingestion status."""
        try:
            ingestion_parameters = request.json
            response_message, status_id = stac_ingestion_service.ingest_stac_data_using_selective_ingester(
                ingestion_parameters)
            return {"message": response_message, "callback_id": status_id}, 200
        except ValueError as e:
            return {
                'message': str(e),
            }, 412
        except IndexError as e:
            return {
                'message': 'Some elements in json body are not present',
            }, 400


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
    @api.expect(StacIngestionDto.stac_ingestion_status_post, validate=True)
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
