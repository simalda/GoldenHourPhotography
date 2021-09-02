from flask import Flask,   jsonify, make_response,   abort, g
def ensure_admin():
    if not g.isAdmin:
         abort(make_response(jsonify("Access forbidden"), 403))