import time
from flask import Flask, request
from stac_validator import stac_validator
import json

# flask cors
from flask_cors import CORS

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/validate/json', methods=['POST'])
def validate_json():
    print('Arrived.')
    input_json = request.get_json()

    # Stac validate must be a file 
    # Convert input_json to a unique temporary file
    with open('temp.json', 'w') as f:
        # write the dict to the file
        f.write(json.dumps(input_json))
        
        stac = stac_validator.StacValidate('temp.json', extensions=True)
        stac.run()
    
    print(stac.message)
    return 'hi'