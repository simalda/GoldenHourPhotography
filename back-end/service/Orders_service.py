import os
import sys
import logging
from flask import Flask, current_app, flash, jsonify, make_response, redirect, request, Blueprint
from werkzeug.utils import secure_filename
from flask_cors import CORS
from data_access.DataAccessOrders import *
from Order import *
from OrderHandler import * 
from Mail import *
from ConfigProvider import *
import json
logger = logging.getLogger(__name__)

bp = Blueprint('orders_page', __name__, template_folder='templates')

@bp.route('/delete-order', methods=['POST'])
def delete_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    return jsonify(or_handler.delete_order(data))

@bp.route('/update-order', methods=['POST'])
def update_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"], data["id"])
    return jsonify(or_handler.update_order(order))

@bp.route('/order', methods=['POST']) 
def add_order():
    data = json.loads(request.stream.read())
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    order = Order( data["date"], data["time"],data["name"],data["telefon"],data["email"],data["location"], data["eventType"],data["note"])
    mail = Mail()
    mail.send_mail(order)
    return jsonify(or_handler.add_new_order(order))

@bp.route('/orders')
def get_orders():
    db = DataAccessOrders()
    or_handler = OrderHandler(db)
    return jsonify(or_handler.get_orders())