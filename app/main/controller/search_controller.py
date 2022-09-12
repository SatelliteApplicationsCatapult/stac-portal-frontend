from flask import request
from flask_restx import Resource

from ..service.search_service import search
from ..util.dto import SearchDto
from typing import Dict, Tuple

api = SearchDto.api
_search = SearchDto.search

# example query GET


# Create an endpoint that contains collections bbox limit and datetime
@api.route("/")
class Search(Resource):
    @api.doc("search")
    @api.param("bbox", "Bounding box of the area to search")
    @api.param("limit", "Number of results to return")
    @api.param("datetime", "Date and time of the search")
    @api.param("intersects", "Intersects")
    @api.param("ids", "Ids")
    @api.param("collections", "Collections")
    def get(self) -> Tuple[Dict[str, str], int]:
        """Search for items"""
        query_params = request.args
        print(f"query_params: {query_params}")
        return search(), 200
