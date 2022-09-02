import uuid
import datetime

from app.main import db
from app.main.model.user import User
from typing import Dict, Tuple


def get_all_collections() -> Tuple[Dict[str, str], int]:
    return {}, 200