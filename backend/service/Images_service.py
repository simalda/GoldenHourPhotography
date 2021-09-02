import os
import sys
sys.path.append(r"C:\Users\\simal\\Projects_Git\\GoldenHourPhotography\\backend\\service")
import logging
import logging.handlers
from flask import Flask, current_app,  jsonify, make_response, redirect, request, Blueprint, g
from werkzeug.utils import secure_filename
from flask_cors import CORS
from data_access.DataAccessImage import *
from Image import *
from ImageHandler import *
import json
import ConfigProvider
from service.Service_common import *
 
logger = logging.getLogger(__name__)

bp = Blueprint('images_page', __name__, template_folder='templates')

@bp.route('/image', methods=['POST'])
def add_image():
    ensure_admin()
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image = Image(None, data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(image_handler.add_image(image))


@bp.route('/image') 
def get_all_images():
    db = DataAccessImage()
    images_from_DB = db.get_all_images()
    logger.info('In FUNCTION %s list of all images returned from DB: %s\n', 'get_all_images', images_from_DB)
    for image in images_from_DB:
         image['path']= ConfigProvider.PHOTOS_BASE_URL + image['name']
    resp = make_response(jsonify(images_from_DB))
    return resp

@bp.route('/update-image', methods=['POST'])
def update_image():
    ensure_admin()
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image =  Image(data["id"], data["name"], data["imageType"], data["eventType"], data["location"])
    return jsonify(image_handler.edit_image(image)) 

@bp.route('/delete', methods=['DELETE'])
def delete_image():
    ensure_admin()
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    res = image_handler.delete_image(data["id"])
    try :
        if res:
            return make_response(jsonify(res), 204)
        else:
            return make_response(jsonify(res), 400)        
    except:
        return make_response("Something went wrong", 400)