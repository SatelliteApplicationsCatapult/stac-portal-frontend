from flask import current_app


def route(path: str, **kwargs) -> str:
    BASE_STAC_URL = current_app.config["BASE_STAC_API_URL"]
    VALIDATION_STAC_URL = current_app.config["VALIDATION_STAC_URL"]

    return {
        "COLLECTIONS": BASE_STAC_URL + "/collections/",
        "VALIDATE": VALIDATION_STAC_URL + "/",
    }[path]
