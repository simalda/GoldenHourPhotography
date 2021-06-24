# import os
# import sys
# import logging
# import logging.handlers
# from concurrent_log_handler import ConcurrentRotatingFileHandler
# from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, url_for, send_from_directory
# from werkzeug.utils import secure_filename
# from flask_cors import CORS
# from DataAccess import *
# from DataAccessCalendar import *
# from DataAccessImage import *
# from DataAccessOrders import *
# from DataAccessLocation import *
# from Image import *
# from ImageHandler import *
# from TimeUnit import *
# from TimeUnitHandler import *
# from LocationHandler import *
# from Location import *
# from Order import *
# from OrderHandler import * 
# from ImageLinkerHandler import *
# from ImageLinker import *
# from Mail import *
# from ConfigProvider import *
# import json
# import FileManipulations

# app = Flask(__name__)
# app.debug = True

# CORS(app)

# handler = ConcurrentRotatingFileHandler('Log/log', maxBytes=10*1024*1024, backupCount=5)
# logging.basicConfig( level=logging.DEBUG, handlers=[handler],format='%(asctime)s %(name)-12s %(levelname)-8s %(message)-3000s',
#                     datefmt='%d-%m-%y %H:%M')
# logger = logging.getLogger(__name__)

# # app.config ['UPLOAD_FOLDER'] = ConfigProvider.UPLOAD_FOLDER

# def allowed_file_extensions(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ConfigProvider.ALLOWED_EXTENSIONS

# @app.route('/image-file', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         flash('No file part')
#         return redirect(request.url)
#     file = request.files['file']
#     if file.filename == '':
#         flash('No selected file')
#         return redirect(request.url)
#     if file and allowed_file_extensions(file.filename):
#         # file.save(os.path.join(app.config['UPLOAD_FOLDER'], request.form['name']))
#         file.save(os.path.join(ConfigProvider.UPLOAD_FOLDER, request.form['name']))

#         resp = make_response(jsonify("Saved", 200))
#         return resp

# @app.route('/image-file/<fileName>', methods=['GET'])
# def get_image_file(fileName):
#     return send_from_directory(UPLOAD_FOLDER, fileName,as_attachment=False)

# @app.route('/login/<user>/<password>')
# def check_user(user, password):
#     db = DataAccess()
#     if len(user) == 0 or len(password) == 0:
#         return jsonify("Bad request"), 400
#     result = db.check_user(user, password)
#     if not result:
#         return jsonify("Authorization failed"), 401
#     elif result:
#         resp = make_response(jsonify(result["guid"]), 200)
#         resp.set_cookie('userID', result["guid"], 3600, secure = True, httponly=True)
#         return resp     

# # @app.route('/addImage', methods=['POST'])
# # def add_image():
# #     if 'admin' in request.cookies:
# #         data = json.loads(request.stream.read())
# #         db = DataAccessImage()
# #         image_handler = ImageHandler(db)
# #         image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
# #         return jsonify(image_handler.add_image(image))
# #     else:
# #         return jsonify("Unauthorized"), 401

# @app.route('/image', methods=['POST'])
# def add_image():
#     data = json.loads(request.stream.read())
#     db = DataAccessImage()
#     image_handler = ImageHandler(db)
#     image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
#     return jsonify(image_handler.add_image(image))    

# @app.route('/image-types') 
# def get_all_image_types():
#     db = DataAccess()
#     return jsonify(db.get_all_image_types())

# @app.route('/event-types') 
# def get_all_event_types():
#     db = DataAccess()
#     return jsonify(db.get_all_event_types()) 

# @app.route('/image') 
# def get_all_images():
#     db = DataAccessImage()
#     images_from_DB = db.get_all_images()
#     logger.info('In FUNCTION %s list of all images returned from DB: %s\n', 'get_all_images', images_from_DB)
#     for image in images_from_DB:
#          image['path']=ConfigProvider.PHOTOS_BASE_URL+image['name']
#     resp = make_response(jsonify(images_from_DB, 200))
#     return resp

# @app.route('/update-image', methods=['POST'])
# def update_image():
#     data = json.loads(request.stream.read())
#     db = DataAccessImage()
#     image_handler = ImageHandler(db)
#     image =  Image(data["name"], data["imageType"], data["eventType"], data["location"])
#     return jsonify(image_handler.edit_image(image)) 

# @app.route('/delete', methods=['POST'])
# def delete_image( ):
#     data = json.loads(request.stream.read())
#     db = DataAccessImage()
#     image_handler = ImageHandler(db)
#     image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
#     return jsonify(image_handler.delete_image(image))

# @app.route('/time-unit', methods=['POST'])
# def add_time_to_calendar():
#     data = json.loads(request.stream.read())
#     db = DataAccessCalendar()
#     tu_handler = TimeUnitHandler(db)
#     time_unit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
#     return jsonify(tu_handler.add_time_to_calendar(time_unit))

# @app.route('/delete-time-unit', methods=['POST'])
# def delete_time_from_calendar():
#     data = json.loads(request.stream.read())
#     db = DataAccessCalendar()
#     tu_handler = TimeUnitHandler(db)
#     timeunit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
#     return jsonify(tu_handler.delete_time_from_calendar(timeunit))

# @app.route('/delete-order', methods=['POST'])
# def delete_order():
#     data = json.loads(request.stream.read())
#     db = DataAccessOrders()
#     or_handler = OrderHandler(db)
#     return jsonify(or_handler.delete_order(data))
             
# @app.route('/delete-location-type', methods=['POST'])
# def delete_location_type():
#     data = json.loads(request.stream.read())
#     db = DataAccessLocation()
#     loc_handler = LocationHandler(db)
#     return jsonify(loc_handler.delete_location_type(data))

# @app.route('/update-order', methods=['POST'])
# def update_order():
#     data = json.loads(request.stream.read())
#     db = DataAccessOrders()
#     or_handler = OrderHandler(db)
#     order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"], data["id"])
#     return jsonify(or_handler.update_order(order))

# @app.route('/time-slots') 
# def get_all_time_slots():
#     db = DataAccessCalendar()
#     tu_handler = TimeUnitHandler(db)
#     return jsonify(tu_handler.get_time_slots())

# @app.route('/weekly-open-slots')
# def get_weekly_slots():
#     db = DataAccessCalendar()
#     tu_handler = TimeUnitHandler(db)
#     return jsonify(tu_handler.get_weekly_time_slots())

# @app.route('/single-open-slots')
# def get_single_slots():
#     db = DataAccessCalendar()
#     tu_handler = TimeUnitHandler(db)
#     return jsonify(tu_handler.get_single_time_slots())

# @app.route('/order', methods=['POST']) 
# def add_order():
#     data = json.loads(request.stream.read())
#     db = DataAccessOrders()
#     or_handler = OrderHandler(db)
#     order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"])
#     mail = Mail()
#     mail.send_mail(order)
#     return jsonify(or_handler.add_new_order(order))

# @app.route('/orders')
# def get_orders():
#     db = DataAccessOrders()
#     or_handler = OrderHandler(db)
#     return jsonify(or_handler.get_orders())

# @app.route('/locations')
# def get_locations_info():
#     db = DataAccessLocation()
#     loc_info_handler = LocationHandler(db)
#     return jsonify(loc_info_handler.get_all_locations_info())

# @app.route('/locations-names')
# def get_locations():
#     db = DataAccess()
#     loc_info_handler = LocationHandler(db)
#     return jsonify(loc_info_handler.get_all_locations())

# @app.route('/location-types')
# def get_location_types():
#     db = DataAccess()
#     loc_info_handler = LocationHandler(db)
#     return jsonify(loc_info_handler.get_all_locations_types())

# @app.route('/location', methods=['POST'])
# def add_location():
#     data = json.loads(request.stream.read())
#     location = Location(data["name"],data["type"],data["latitude"],data["longitude"], data["description"] )
#     loc_DB = DataAccessLocation()
#     loc_handler = LocationHandler(loc_DB)
#     loc_handler.add_location(location) 
#     logger.info('In FUNCTION %s data of new location  that need to be added to Db: %s\n', 'add_location', data)
#     image = Image(data["sphereImageList"][0]['name'], "sphere", data["type"], data["name"])
#     im_DB = DataAccessImage()
#     im_handler = ImageHandler(im_DB)
#     im_handler.add_image(image)
#     return '200'

# @app.route('/location-types', methods=['POST'])
# def add_location_type():
#     location_type = json.loads(request.stream.read())
#     loc_DB = DataAccessLocation()
#     loc_handler = LocationHandler(loc_DB)       
#     return  jsonify(loc_handler.add_location_type(location_type))

# @app.route('/send-mail', methods=['POST'])
# def send_mail():
#     data = json.loads(request.stream.read())
#     order = Order(data["date"], data["time"], data["name"], data["telefon"], data["email"], data["location"], data["eventType"], data["note"])    
#     return  

# @app.route('/upsert-link', methods=['POST'])
# def upsert_link():
#     data = json.loads(request.stream.read())
#     db = DataAccessLocation()
#     link_handler = ImageLinkerHandler(db)
#     link =  ImageLinker(data["origin"], data["destination"], data["latitude"], data["longitude"])
#     return jsonify(link_handler.upsert_link(link))

# @app.route('/links-to-image', methods=['POST'])
# def get_links():
#     data = json.loads(request.stream.read())
#     db = DataAccessLocation()
#     link_handler = ImageLinkerHandler(db)
#     image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
#     return jsonify(link_handler.get_links_for_image(image))

# @app.route('/delete-link', methods=['POST'])
# def delete_link():
#     data = json.loads(request.stream.read())
#     db = DataAccessLocation()
#     link_handler = ImageLinkerHandler(db)
#     link =  ImageLinker(data["origin"], data["destination"], data["latitude"], data["longitude"])
#     return jsonify(link_handler.delete_link(link))

# if __name__ == "__main__":
#     app.run(port=5000)
