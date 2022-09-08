import sqlalchemy
from flask import request
from flask_restx import Resource

from ..service import public_catalogs_service
from ..util.dto import PublicCatalogsDto

api = PublicCatalogsDto.api


@api.route('/')
class PublicCatalogs(Resource):

    @api.doc('List all public catalogs in the database')
    @api.response(200, 'Success')
    def get(self):
        """List all public catalogs."""
        return public_catalogs_service.get_all_public_catalogs()

    @api.doc('Store a new public catalog in the database')
    @api.expect(PublicCatalogsDto.add_public_catalog, validate=True)
    @api.response(201, 'Success')
    @api.response(400, 'Validation Error - Some elements are missing')
    def post(self):
        """Store a new public catalog."""
        try:
            data = request.json
            name = data['name']
            url = data['url']
            description = data['description']
            stac_version = data['stac_version']
            return public_catalogs_service.store_new_public_catalog(
                name, url, description, stac_version), 201
        except IndexError as e:
            return {
                       'message': 'Some elements in json body are not present',
                       'full_trace': str(e)
                   }, 400


@api.route('/<int:public_catalog_id>')
class PublicCatalogsViaId(Resource):

    @api.doc('Get a public catalog via its id')
    @api.response(200, 'Success')
    @api.response(404, 'Public catalog not found')
    def get(self, public_catalog_id):
        """Get a public catalog via its id."""
        try:
            return public_catalogs_service.get_public_catalog_by_id(
                public_catalog_id)
        except AttributeError:
            return {'message': 'Public catalog not found'}, 404

    @api.doc('Remove a public catalog via its id')
    @api.response(200, 'Success')
    @api.response(404, 'Public catalog not found so it cant be removed')
    def delete(self, public_catalog_id):
        """Remove a public catalog via its id."""
        try:
            return public_catalogs_service.remove_public_catalog_by_id(
                public_catalog_id)
        except sqlalchemy.orm.exc.UnmappedInstanceError:
            return {'message': 'No result found'}, 404
