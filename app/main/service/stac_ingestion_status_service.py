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


def create_stac_ingestion_status_entry(newly_stored_collections_count: int,
                                       newly_stored_collections: str,
                                       updated_collections_count: int,
                                       updated_collections: str,
                                       newly_stored_items_count : int,
                                       updated_items_count:int,
                                       already_stored_items_count:int) -> Tuple[Dict[any, any]]:
    a: StacIngestionStatus = StacIngestionStatus(
        newly_stored_collections_count=newly_stored_collections_count,
        newly_stored_collections=",".join(newly_stored_collections),
        updated_collections_count=updated_collections_count,
        updated_collections=",".join(updated_collections),
        newly_stored_items_count=newly_stored_items_count,
        updated_items_count=updated_items_count,
        already_stored_items_count=already_stored_items_count)
    db.session.add(a)
    db.session.commit()
    return a.as_dict()

