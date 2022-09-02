from flask import request
from flask_restx import Resource

from ..service.collection_service import get_all_collections, get_collection_by_id, get_items_by_collection_id, get_item_from_collection
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


@api.route("/<collection_id>")
class Collection(Resource):
    """
    Collection Resource
    """

    @api.doc("get_collection")
    def get(self, collection_id: str) -> Tuple[Dict[str, str], int]:
        """Get a collection by id"""
        return get_collection_by_id(collection_id)


@api.route("/<collection_id>/items")
class CollectionItems(Resource):
    """
    Collection Items Resource
    """

    @api.doc("get_collection_items")
    def get(self, collection_id: str) -> Tuple[Dict[str, str], int]:
        """Get a collection by id"""
        return get_items_by_collection_id(collection_id)


@api.route("/<collection_id>/items/<item_id>")
class CollectionItem(Resource):
    """
    Collection Item Resource
    """

    @api.doc("get_collection_item")
    def get(self, collection_id: str, item_id: str) -> Tuple[Dict[str, str], int]:
        """Get a collection by id"""
        return get_item_from_collection(collection_id, item_id)