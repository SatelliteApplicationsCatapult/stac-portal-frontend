from flask import current_app
from flask_restx import Resource, Namespace, fields


def route(path: str, **kwargs) -> str:
    BASE_STAC_URL = current_app.config["BASE_STAC_API_URL"]

    return {
        "COLLECTIONS": BASE_STAC_URL + "/collections",
    }[path]
