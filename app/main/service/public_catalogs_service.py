from typing import Dict, List

from .. import db
from ..model.public_catalogs_model import PublicCatalog


def store_new_public_catalog(name: str, url: str, description: str,
                             stac_version: str) -> Dict[any, any]:
    """Store a new public catalog in the database.

    :param name: Name of the catalog
    :param url: URL of the catalog, to stac api root
    :param description: Description of the catalog
    :param stac_version: Stac version catalogue used
    :return: New catalogue parameters from database as dict
    """
    a: PublicCatalog = PublicCatalog()
    a.name = name
    a.url = url
    a.description = description
    a.stac_version = stac_version
    db.session.add(a)
    db.session.commit()
    return a.as_dict()


def get_all_public_catalogs() -> List[Dict[any, any]]:
    """Get all public catalogs from the database.

    :return: List of all public catalogs as list of dicts
    """
    a: PublicCatalog = PublicCatalog.query.all()
    return [i.as_dict() for i in a]


def get_public_catalog_by_id(public_catalog_id: int) -> Dict[any, any]:
    """Get a public catalog by its id.

    :param public_catalog_id: Id of the public catalog
    :return: Public catalog as dict
    """
    a: PublicCatalog = PublicCatalog.query.filter_by(
        id=public_catalog_id).first()
    return a.as_dict()


def remove_public_catalog_by_id(public_catalog_id: int) -> Dict[any, any]:
    """Remove a public catalog by its id.

    :param public_catalog_id: Id of the public catalog
    :return: Public catalog as dict
    """
    a: PublicCatalog = PublicCatalog.query.filter_by(
        id=public_catalog_id).first()
    db.session.delete(a)
    db.session.commit()
    return a.as_dict()
