import os
import sys
import logging
from flask import Blueprint, Flask, jsonify, make_response, redirect, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
from data_access.DataAccessCalendar import *
from TimeUnit import *
from TimeUnitHandler import *
from ConfigProvider import *
import json
 
logger = logging.getLogger(__name__)

bp = Blueprint('calendar_page', __name__, template_folder='templates')

@bp.route('/time-unit', methods=['POST'])
def add_time_to_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    time_unit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tu_handler.add_time_to_calendar(time_unit))

@bp.route('/delete-time-unit', methods=['POST'])
def delete_time_from_calendar():
    data = json.loads(request.stream.read())
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    timeunit = TimeUnit(data["date"],data["dayOfWeek"],data["time"],data["isWeekly"] )
    return jsonify(tu_handler.delete_time_from_calendar(timeunit))

@bp.route('/time-slots') 
def get_all_time_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_time_slots())

@bp.route('/weekly-open-slots')
def get_weekly_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_weekly_time_slots())

@bp.route('/single-open-slots')
def get_single_slots():
    db = DataAccessCalendar()
    tu_handler = TimeUnitHandler(db)
    return jsonify(tu_handler.get_single_time_slots())