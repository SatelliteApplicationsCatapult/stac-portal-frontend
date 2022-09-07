import os
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_cors import CORS

from app import blueprint
from app.main import create_app, db
from app.main.model import *

app = create_app(os.getenv('PORTAL_ENV') or 'dev')
app.register_blueprint(blueprint)

app.app_context().push()

CORS(app, resources={r"/*": {"origins": "*"}})

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def run():
    # app.run on 0.0.0.0:5000
    app.run(host='0.0.0.0', port=5000)
    db.create_all()


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()
