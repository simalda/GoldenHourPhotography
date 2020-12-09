from flask import Flask, jsonify, request, json
from flask_cors import CORS
from DataAccess import *
import json
app = Flask(__name__)
app.debug = True
CORS(app)
print(__name__)




@app.route('/login/<user>/<password>')
def check_user(user, password):
    db = DataAccess()
    return jsonify(db.checkUser(user, password))

 
@app.route('/addImage/<name>/<imageType>/<imageLocation>/<imageViewType>/<bannerApearence>')
def add_image(name,  imageType,  imageLocation,  imageViewType,  bannerApearence):
    db = DataAccess()
    return jsonify(db.addImage(name,  imageType,  imageLocation,  imageViewType,  bannerApearence))


 


 


if __name__ == "__main__":
    app.run(port=5000)
