import imp
from flask import current_app
from typing import Dict, Tuple
from ..routes import route
from ..model.stac_ingestion_status_model import StacIngestionStatus
import json
from typing import Dict, Tuple, List
from .. import db, flask_bcrypt


def get_all_stac_ingestion_statuses() -> List[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus.query.all()
    return [i.as_dict() for i in a]


def get_stac_ingestion_status_by_id(id: str) -> Dict[any, any]:
    a: StacIngestionStatus = StacIngestionStatus.query.filter_by(id=id).first()
    return a.as_dict()


def create_stac_ingestion_status_entry(data: Dict[any, any]) -> Tuple[Dict[any, any], int]:
    pass
    # a: StacIngestionStatus = StacIngestionStatus(**data)
    # db.session.add(a)
    # db.session.commit()
