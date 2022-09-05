from typing import Dict, Tuple, Any
from ..routes import route

import requests


def validate_json(data: Dict[str, Any]) -> Tuple[Dict[str, str], int]:
    """
    Validate JSON
    """
    validate_endpoint = route("VALIDATE")

    headers = {"Content-Type": "application/json"}
    response = requests.post(validate_endpoint, json=data["json"], headers=headers)
    return response.text, 200
