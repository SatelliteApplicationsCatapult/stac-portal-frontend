from flask import request
from flask_restx import Resource

from ..service.collection_service import get_all_collections
from ..util.dto import CollectionsDto
from typing import Dict, Tuple

api = CollectionsDto.api
collections = CollectionsDto.collection

@api.route('/')
class CollectionsList(Resource):
    """
    Collection Resource
    """
    @api.doc('list_of_collections')
    def get(self) -> Tuple[Dict[str, str], int]:
        """List all collections"""
        return get_all_collections()