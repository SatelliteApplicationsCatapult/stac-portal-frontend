from flask import current_app
from typing import Dict, Tuple
import requests
from ..routes import route


def search() -> Tuple[Dict[str, str], int]:
    return {}, 200
