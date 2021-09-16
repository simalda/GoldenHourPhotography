import os
import sys

import logging
from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, Blueprint
from werkzeug.utils import secure_filename
from flask_cors import CORS
from data_access.DataAccessLocation import *
from data_access.DataAccessImage import *
from LocationHandler import *
from Location import *
from ImageLinkerHandler import *
from ImageLinker import *
from Image import *
from ImageHandler import *
from ConfigProvider import *
import json
 
logger = logging.getLogger(__name__)

bp = Blueprint('locations_page', __name__, template_folder='templates')



@bp.route('/locations')
def get_locations_info():
    db = DataAccessLocation()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations_info())

@bp.route('/locations', methods=['POST'])
def add_location():
    ensure_admin()
    data = json.loads(request.stream.read())
    location = Location(data["name"],data["type"],data["latitude"],data["longitude"], data["description"] )
    loc_DB = DataAccessLocation()
    loc_handler = LocationHandler(loc_DB)
    loc_handler.add_location(location) 
    logger.info('In FUNCTION %s data of new location  that need to be added to Db: %s\n', 'add_location', data)
    image = Image(data["id"], data["sphereImageList"][0]['name'], "sphere", data["type"], data["name"])
    im_DB = DataAccessImage()
    im_handler = ImageHandler(im_DB)
    im_handler.add_image(image)
    return '200'
