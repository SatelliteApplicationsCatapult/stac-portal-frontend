from flask import request
from flask_restx import Resource

from ..service.collection_service import get_all_collections, get_collection_by_id
from ..util.dto import CollectionsDto
from typing import Dict, Tuple

api = CollectionsDto.api
collections = CollectionsDto.collection


@api.route("/")
class CollectionsList(Resource):
    """
    Collections Resource
    """

    @api.doc("list_of_collections")
    def get(self) -> Tuple[Dict[str, str], int]:
        """List all collections"""
        return get_all_collections()


@api.route("/<id>")
class Collection(Resource):
    """
    Collection Resource
    """

    @api.doc("get_collection")
    def get(self, id: str) -> Tuple[Dict[str, str], int]:
        """Get a collection by id"""
        return get_collection_by_id(id)
