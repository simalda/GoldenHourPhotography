import os
from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
from DataAccess import *
from DataAccessCalendar import *
from DataAccessImage import *
from DataAccessOrders import *
from DataAccessLocation import *
from Image import *
from ImageHandler import *
from TimeUnit import *
from TimeUnitHandler import *
from LocationHandler import *
from Location import *
from Order import *
from OrderHandler import * 
from ImageLinkerHandler import *
from ImageLinker import *
from Mail import *
import json
import FileManipulations
app = Flask(__name__)
app.debug = True

CORS(app)

UPLOAD_FOLDER = r'C:\Users\simal\Projects_Git\GoldenHourPhotography\front-end\src\static\photos\galery\test'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg'}
app.config ['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('uploaded_file',
                                    filename=filename))
    

@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    if len(user) == 0 or len(password) == 0:
        return jsonify("Bad request"), 400
    result = db.check_user(user, password)
    if not result:
        return jsonify("Authorization faled"), 401
    elif result:
        resp = make_response(jsonify(result["guid"]), 200)
        resp.set_cookie('userID', result["guid"], 3600, secure = True, httponly=True)
        return resp
     

@app.route('/addImage', methods=['POST'])
def add_image():
    if 'admin' in request.cookies:
        data = json.loads(request.stream.read())
        db = DataAccessImage()
        image_handler = ImageHandler(db)
        image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
        return jsonify(image_handler.add_image(image))
    else:
        return jsonify("Unauthorized"), 401


@app.route('/getAllImageTypes') 
def get_all_image_types():
    db = DataAccess()
    return jsonify(db.get_all_image_types())


@app.route('/getAllEventTypes') 
def get_all_event_types():
    db = DataAccess()
    return jsonify(db.get_all_event_types())
 

@app.route('/getAllImages') 
def get_all_images():
    db = DataAccessImage()
    print(db.get_all_images())
    return jsonify(db.get_all_images())

@app.route('/updateImage', methods=['POST'])
def update_image():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image =  Image(data["name"], data["imageType"], data["eventType"], data["location"])
    return jsonify(image_handler.edit_image(image))
 

@app.route('/delete', methods=['POST'])
def delete_image( ):
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(image_handler.delete_image(image)) #RECHECK 


@app.route('/addTimeUnit', methods=['POST'])
def add_time_to_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    time_unit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tu_handler.add_time_to_calendar(time_unit))

@app.route('/deleteTimeUnit', methods=['POST'])
def delete_time_from_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    timeunit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tu_handler.delete_time_from_calendar(timeunit))

@app.route('/deleteOrder', methods=['POST'])
def delete_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    return jsonify(or_handler.delete_order(data))
             
@app.route('/deleteLocationType', methods=['POST'])
def delete_location_type():
    data = json.loads(request.stream.read())
    db = DataAccessLocation()
    loc_handler = LocationHandler(db)
    return jsonify(loc_handler.delete_location_type(data))


@app.route('/updateOrder', methods=['POST'])
def update_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"], data["id"])
    return jsonify(or_handler.update_order(order))

@app.route('/getTimeSlots') 
def get_all_time_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_time_slots())


@app.route('/getWeeklyOpenSlots')
def get_weekly_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_weekly_time_slots())

@app.route('/getSingleOpenSlots')
def get_single_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_single_time_slots())


@app.route('/addorder', methods=['POST']) 
def add_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"])
    mail = Mail()
    mail.send_mail(order)
    return jsonify(or_handler.add_new_order(order))

@app.route('/getOrders')
def get_orders():
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    return jsonify(or_handler.get_orders())

@app.route('/getLocationsInfo')
def get_locations_info():
    db = DataAccessLocation()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations_info())

@app.route('/getLocations')
def get_locations():
    db = DataAccess()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations())

@app.route('/getLocationTypes')
def get_location_types():
    db = DataAccess()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations_types())

@app.route('/addLocation', methods=['POST'])
def add_location():
    data = json.loads(request.stream.read())
    location = Location(data["name"],data["type"],data["latitude"],data["longtitude"], data["description"] )
    loc_DB = DataAccessLocation()
    loc_handler = LocationHandler(loc_DB)
    loc_handler.add_location(location)
    print(data)
    image = Image(data["regularImageList"][0], "regular", "", data["name"])
    im_DB = DataAccessImage()
    im_handler = ImageHandler(im_DB)
    im_handler.add_image(image)
    return '200'

@app.route('/addLocationType', methods=['POST'])
def add_location_type():
    location_type = json.loads(request.stream.read())
    loc_DB = DataAccessLocation()
    loc_handler = LocationHandler(loc_DB)       
    return  jsonify(loc_handler.add_location_type(location_type))


@app.route('/sendMail', methods=['POST'])
def send_mail():
    data = json.loads(request.stream.read())
    order = Order(data["date"], data["time"], data["name"], data["telefon"], data["email"], data["location"], data["eventType"], data["note"])    
    return 
 

@app.route('/upsertLink', methods=['POST'])
def upsert_link():
    data = json.loads(request.stream.read())
    db = DataAccessLocation()
    link_handler = ImageLinkerHandler(db)
    link =  ImageLinker(data["origin"], data["destination"], data["latitude"], data["longtitude"])
    return jsonify(link_handler.upsert_link(link))

@app.route('/getLinksToImage', methods=['POST'])
def get_links():
    data = json.loads(request.stream.read())
    db = DataAccessLocation()
    link_handler = ImageLinkerHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(link_handler.get_links_for_image(image))


if __name__ == "__main__":
    app.run(port=5000)
