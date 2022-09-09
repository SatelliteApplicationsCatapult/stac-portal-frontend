import os

# uncomment the line below for postgres database url from environment variable
# postgres_local_base = os.environ['DATABASE_URL']

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    # here are global variables available for all environments
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False
    # Swagger
    RESTX_MASK_SWAGGER = False


class DevelopmentConfig(Config):
    # here are variables available only for development environment
    ENV = "DEV"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(
        basedir, 'flask_boilerplate_main.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BASE_STAC_API_URL = os.getenv('BASE_STAC_API_URL',
                                  'https://stac-api-server.azurewebsites.net')
    VALIDATION_STAC_URL = os.getenv('VALIDATION_STAC_URL',
                                    'http://localhost:6789')
    STAC_SELECTIVE_INGESTER_CIDR_RANGE = os.getenv(
        'STAC_SELECTIVE_INGESTER_CIDR_RANGE', "172.17.0.0/24"
    )  # you can set specific ip with /32 mask, i.e. 172.17.0.41/32
    STAC_SELECTIVE_INGESTER_PORT = os.getenv('STAC_SELECTIVE_INGESTER_PORT',
                                             8888)
    STAC_SELECTIVE_INGESTER_PROTOCOL = os.getenv(
        'STAC_SELECTIVE_INGESTER_PROTOCOL', "http")


# class TestingConfig(Config):
#     DEBUG = True
#     TESTING = True
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(
#         basedir, 'flask_boilerplate_test.db')
#     PRESERVE_CONTEXT_ON_EXCEPTION = False
#     SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    ENV = "Production"
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base


config_by_name = dict(
    dev=DevelopmentConfig,
    # test=TestingConfig,
    prod=ProductionConfig)

key = Config.SECRET_KEY
