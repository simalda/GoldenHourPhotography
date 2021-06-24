import os
import sys
import logging
import logging.handlers
from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, Blueprint
from werkzeug.utils import secure_filename
from flask_cors import CORS
from data_access.DataAccessImage import *
from Image import *
from ImageHandler import *
import json
import ConfigProvider
 
logger = logging.getLogger(__name__)

bp = Blueprint('images_page', __name__, template_folder='templates')

@bp.route('/image', methods=['POST'])
def add_image():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(image_handler.add_image(image))   

@bp.route('/image') 
def get_all_images():
    db = DataAccessImage()
    images_from_DB = db.get_all_images()
    logger.info('In FUNCTION %s list of all images returned from DB: %s\n', 'get_all_images', images_from_DB)
    for image in images_from_DB:
         image['path']= ConfigProvider.PHOTOS_BASE_URL+image['name']
    resp = make_response(jsonify(images_from_DB, 200))
    return resp

@bp.route('/update-image', methods=['POST'])
def update_image():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image =  Image(data["name"], data["imageType"], data["eventType"], data["location"])
    return jsonify(image_handler.edit_image(image)) 

@bp.route('/delete', methods=['POST'])
def delete_image( ):
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(image_handler.delete_image(image))