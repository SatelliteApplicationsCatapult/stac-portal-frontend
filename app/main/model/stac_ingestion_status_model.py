from email.policy import default
from math import fabs
from .. import db, flask_bcrypt
from flask_sqlalchemy import SQLAlchemy
import datetime
from ..config import key
import jwt
from typing import Union
from flask_sqlalchemy.model import DefaultMeta


class StacIngestionStatus(db.Model):
    __tablename__ = "stac_ingestion_status"
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    newly_stored_collections_count = db.Column(
        db.Integer,nullable=True, default=0)
    newly_stored_collections = db.Column(db.Text, nullable=True,default="")
    updated_collections_count = db.Column(
        db.Integer, nullable=True, default=0)
    updated_collections = db.Column(db.Text, nullable=True,default="")
    newly_stored_items_count = db.Column(db.Integer,nullable=True,  default=0)
    updated_items_count = db.Column(db.Integer, nullable=True, default=0)
    already_stored_items_count = db.Column(
        db.Integer, nullable=True, default=0)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
