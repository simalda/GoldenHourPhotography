from flask import Flask, jsonify, request, json
from flask_cors import CORS
from DataAccess import *
from Image import *
from ImageHandler import *
import json
app = Flask(__name__)
app.debug = True
CORS(app)
print(__name__)




@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    return jsonify(db.checkUser(user, password))

 
@app.route('/addImage', methods=['POST'])
def add_image():
    data = json.loads(request.stream.read())
    db = DataAccess()
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
    db = DataAccess()
    print(db.getAllImages())
    return jsonify(db.getAllImages())

@app.route('/update', methods=['POST'])
def update_images():
    data = json.loads(request.stream.read())
    db = DataAccess()
    imHandler = ImageHandler(db)
    imList = []
    for im in data:
        imList.append( Image(im["name"],im["imageType"],im["eventType"],im["location"]))
    return jsonify(imHandler.edit_all_images(imList))
 

@app.route('/delete', methods=['POST'])
def delete_image( ):
    data = json.loads(request.stream.read())
    db = DataAccess()
    imHandler = ImageHandler(db)
    image = Image(data["name"],data["imageType"],data["eventType"],data["location"])
    return jsonify(db.deleteImage(image))


if __name__ == "__main__":
    app.run(port=5000)
