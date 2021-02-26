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
import json
app = Flask(__name__)
app.debug = True
CORS(app)
print(__name__)




@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    if(db.checkUser(user, password)):
        response = make_response(                jsonify({"result":True}),                200,      )
        response.headers["Content-Type"] = "application/json"
        return response
    else: 
        response = make_response(
                jsonify({"result":False}),
                200,            )
        response.headers["Content-Type"] = "application/json"
        return response

 
@app.route('/addImage', methods=['POST'])
def add_image():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    imHandler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(imHandler.add_image(image))


@app.route('/getAllImageTypes') 
def get_all_image_types():
    db = DataAccess()
    return jsonify(db.getAllImageTypes())


@app.route('/getAllEventTypes') 
def get_all_event_types():
    db = DataAccess()
    return jsonify(db.getAllEventTypes())
 

@app.route('/getAllImages') 
def get_all_images():
    db = DataAccessImage()
    print(db.getAllImages())
    return jsonify(db.getAllImages())

@app.route('/update', methods=['POST'])
def update_images():
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    imHandler = ImageHandler(db)
    imList = []
    for im in data:
        imList.append( Image(im["name"],im["imageType"],im["eventType"],im["location"]))
    return jsonify(imHandler.edit_all_images(imList))
 

@app.route('/delete', methods=['POST'])
def delete_image( ):
    data = json.loads(request.stream.read())
    db = DataAccessImage()
    imHandler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(db.deleteImage(image))


@app.route('/addTimeUnit', methods=['POST'])
def add_time_to_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    timeunit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tuHandler.add_time_to_calendar(timeunit))

@app.route('/deleteTimeUnit', methods=['POST'])
def delete_time_from_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    timeunit = TimeUnit(data["date"],data["dateFormated"],data["time"],data["isWeekly"] )
    return jsonify(tuHandler.delete_time_from_calendar(timeunit))

@app.route('/getTimeSlots') 
def get_all_time_slots():
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    return jsonify(tuHandler.get_time_slots())


@app.route('/getWeeklyOpenSlots')
def get_weekly_slots():
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    return jsonify(tuHandler.get_weekly_time_slots())

@app.route('/getSingleOpenSlots')
def get_single_slots():
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    return jsonify(tuHandler.get_single_time_slots())



@app.route('/getOpenSlots') 
def get_open_slots():
    db = DataAccessCalendar()
    tuHandler = TimeUnitHandler(db)
    return jsonify(tuHandler.get_all_open_slots())

@app.route('/addorder', methods=['POST']) 
def add_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    orHandler = OrderHandler(db)
    order =Order(data["name"],data["telefon"],data["email"],data["location"], data["date"], data["time"], data["eventType"],data["note"])
    return jsonify(orHandler.add_new_order(order))

@app.route('/getOrders')
def get_orders():
    db = DataAccessOrders()
    orHandler = OrderHandler(db)
    return jsonify(orHandler.get_orders())

@app.route('/getLocationsInfo')
def get_locations_info():
    db = DataAccessImage()
    locInfoHandler = LocationHandler(db)
    return jsonify(locInfoHandler.get_all_locations_info())

  

if __name__ == "__main__":
    app.run(port=5000)
