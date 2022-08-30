import time
from flask import Flask

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}
