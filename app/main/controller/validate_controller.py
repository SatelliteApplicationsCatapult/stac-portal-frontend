from flask import request, jsonify
from flask_restx import Resource

from ..service.validate_service import validate_json
from ..util.dto import ValidateDto
from typing import Dict, Tuple, Any

api = ValidateDto.api
validate = ValidateDto.validate


@api.route("/json")
class ValidateJSON(Resource):
    """Validate JSON Resource."""

    @api.doc("validate_json")
    @api.expect(validate)
    def post(self) -> Tuple[Dict[str, str], int]:
        """Validate JSON."""
        data = request.json
        return jsonify(validate_json(data=data))
