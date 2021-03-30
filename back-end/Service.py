from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, url_for
from flask_cors import CORS
from DataAccess import *
from DataAccessCalendar import *
from DataAccessImage import *
from DataAccessOrders import *
from Image import *
from ImageHandler import *
from TimeUnit import *
from TimeUnitHandler import *
from LocationHandler import *
from Order import *
from OrderHandler import * 
from Mail import *
import json
app = Flask(__name__)
app.debug = True
CORS(app)
print(__name__)


 

@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    if(db.check_user(user, password)):
        response = make_response(                jsonify({"result":True}),                200,      )
        response.headers["Content-Type"] = "application/json"
        return response
    else: 
        response = make_response(
                jsonify({"result":False}),
                200,            )
        response.headers["Content-Type"] = "application/json"
        return response

@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.stream.read())
    if len(data) == 0:
        return jsonify("Bad request"), 400
    db = DataAccessImage()
    result = db.check_user(user, password)
    if not result:
        return jsonify("Authorization faled"), 401
    elif result:
        return jsonify("Authorization success"), 200
     

        
@app.route('/addImage', methods=['POST'])
def add_image():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(image_handler.add_image(image))


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

@app.route('/update', methods=['POST'])
def update_images():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    image_handler = ImageHandler(db)
    image_list = []
    for im in data:
        image_list.append( Image(im["name"],im["imageType"],im["eventType"],im["location"]))
    return jsonify(image_handler.edit_all_images(image_list))
 

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
    timeunit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tu_handler.add_time_to_calendar(timeunit))

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
    db = DataAccessImage()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations_info())

@app.route('/getLocations')
def get_locations():
    db = DataAccess()
    loc_info_handler = LocationHandler(db)
    return jsonify(loc_info_handler.get_all_locations())

@app.route('/sendMail', methods=['POST'])
def send_mail():
    data = json.loads(request.stream.read())
    order =Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"],  data["eventType"],data["note"])    
    return 
 

if __name__ == "__main__":
    app.run(port=5000)
