from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.collection_controller import api as collection_ns
from .main.controller.validate_controller import api as validate_ns
from .main.controller.stac_ingestion_status_controller import api as stac_ingestion_status_ns

blueprint = Blueprint('api', __name__)
authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

api = Api(blueprint,
          title='STAC Portal',
          version='1.0',
          description='Portal for accessing STAC PDA resources',
          authorizations=authorizations,
          security='apikey')

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns)
api.add_namespace(collection_ns, path='/collections')
api.add_namespace(validate_ns, path='/validate')
api.add_namespace(stac_ingestion_status_ns, path='/stac_ingestion_status')
