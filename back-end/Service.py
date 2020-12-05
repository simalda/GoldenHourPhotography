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
    fs= db.checkUser(user, password)
    print(fs)
    print(jsonify(db.checkUser(user, password)))
    return jsonify(db.checkUser(user, password))


 


 


 


if __name__ == "__main__":
    app.run(port=5000)
