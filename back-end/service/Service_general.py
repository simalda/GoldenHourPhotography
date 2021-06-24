import os
import sys

import logging
import logging.handlers
from concurrent_log_handler import ConcurrentRotatingFileHandler
from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS

from data_access.DataAccess import *

from LocationHandler import *
from Mail import *
from ConfigProvider import *
import json
import FileManipulations

app = Flask(__name__)

import service.Calendar_service
import service.Images_service
import service.Locations_service
import service.Orders_service
app.register_blueprint(service.Calendar_service.bp)
app.register_blueprint(service.Images_service.bp)
app.register_blueprint(service.Locations_service.bp)
app.register_blueprint(service.Orders_service.bp)
 


app.debug = True


CORS(app)

handler = ConcurrentRotatingFileHandler('./Log/log', maxBytes=10*1024*1024, backupCount=5)
logging.basicConfig( level=logging.DEBUG, handlers=[handler],format='%(asctime)s %(name)-12s %(levelname)-8s %(message)-3000s',
                    datefmt='%d-%m-%y %H:%M')
logger = logging.getLogger(__name__)


def allowed_file_extensions(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ConfigProvider.ALLOWED_EXTENSIONS

@app.route('/image-file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file_extensions(file.filename):
        file.save(os.path.join(ConfigProvider.UPLOAD_FOLDER, request.form['name']))

        resp = make_response(jsonify("Saved", 200))
        return resp

@app.route('/image-file/<fileName>', methods=['GET'])
def get_image_file(fileName):
    return send_from_directory(UPLOAD_FOLDER, fileName,as_attachment=False)

@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    if len(user) == 0 or len(password) == 0:
        return jsonify("Bad request"), 400
    result = db.check_user(user, password)
    if not result:
        return jsonify("Authorization failed"), 401
    elif result:
        resp = make_response(jsonify(result["guid"]), 200)
        resp.set_cookie('userID', result["guid"], 3600, secure = True, httponly=True)
        return resp     

@app.route('/image-types') 
def get_all_image_types():
    db = DataAccess()
    return jsonify(db.get_all_image_types())

@app.route('/event-types') 
def get_all_event_types():
    db = DataAccess()
    return jsonify(db.get_all_event_types()) 

@app.route('/locations-names')
def get_locations():
    db = DataAccess()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations())

@app.route('/location-types')
def get_location_types():
    db = DataAccess()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations_types())

@app.route('/send-mail', methods=['POST'])
def send_mail():
    data = json.loads(request.stream.read())
    order = Order(data["date"], data["time"], data["name"], data["telefon"], data["email"], data["location"], data["eventType"], data["note"])    
    return  

if __name__ == "__main__":
    app.run(port=5000)


