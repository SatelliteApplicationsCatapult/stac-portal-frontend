from flask import current_app
from typing import Dict, Tuple
import requests
from ..routes import route


def get_all_collections() -> Tuple[Dict[str, str], int]:
    response = requests.get(route("COLLECTIONS"))

    if response.status_code == 200:
        collection_json = response.json()
        collection_count = len(collection_json["collections"])
        return {
            "data": collection_json,
            "count": collection_count,
            "status": "success",
        }, response.status_code

    return {"count": 0, "status": "failed"}, response.status_code


def get_collection_by_id(collection_id: str) -> Tuple[Dict[str, str], int]:
    response = requests.get(route("COLLECTIONS") + collection_id)

    if response.status_code == 200:
        collection_json = response.json()
        return {
            "data": collection_json,
            "status": "success",
        }, response.status_code

    return {"count": 0, "status": "failed"}, response.status_code


def get_items_by_collection_id(collection_id: str) -> Tuple[Dict[str, str], int]:
    response = requests.get(route("COLLECTIONS") + collection_id + "/items")

    if response.status_code == 200:
        collection_json = response.json()
        return {
            "data": collection_json,
            "status": "success",
        }, response.status_code

    return {"count": 0, "status": "failed"}, response.status_code


def get_item_from_collection(
    collection_id: str, item_id: str
) -> Tuple[Dict[str, str], int]:
    response = requests.get(route("COLLECTIONS") + collection_id + "/items/" + item_id)

    if response.status_code == 200:
        collection_json = response.json()
        return {
            "data": collection_json,
            "status": "success",
        }, response.status_code

    return {"count": 0, "status": "failed"}, response.status_code
