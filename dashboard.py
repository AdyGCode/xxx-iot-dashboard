# Project:    xxx-iot-dashboard
# Filename:   dashboard.py
# Location:   ./
# Author:     STUDENT NAME <STUDENT TAFE EMAIL ADDRESS>
# Created:    05/05/21
# Purpose:
#   This file provides the following features, methods and associated
#   supporting code:
#
#   TODO: STUDENT TO DESCRIBE THE PURPOSE OF THIS FILE
#
# Requirements:
#   An MQTT Server to act as a 'broker' to accept messages and pass onto
#   subscribers to the message topic(s).
#   Python 3.6 or later
#
# Required Packages:
#   This project requires the following Python Packages to be installed:
#       paho-mqtt
#       piview http://piview.readthedocs.io
#       SQLAlchemy
#       MySQL Connector Python

from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, desc, inspect
from sqlalchemy.orm import sessionmaker

from DB import Base, db_connect, Sensehat_TPH, Sensor

# ---------------------------------------------------------------------
# Initialise the Flask Web Application, CORS, Database Connection,
# and Session
# Ensure the tables are created (IMPORTANT - NO DROP_ALL in this app)
# ---------------------------------------------------------------------
MyDashboardApp = Flask(__name__)
MyDashboardCorsApp = CORS(MyDashboardApp,
                          resources={
                              r"/api/*": {"origins": "*"}
                          })
MyDashboardApp.config['CORS_HEADERS'] = 'Content-Type'

engine = create_engine(db_connect)
Base.metadata.create_all(engine, checkfirst=True)
session = sessionmaker(bind=engine)()


# ---------------------------------------------------------------------
# Utility Method definitions
# ---------------------------------------------------------------------

def object_as_dict(obj):
    """Convert an object to a dictionary

    :param obj:
    :return: dictionary
    """
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


def records_to_list(records):
    """Convert an SQLAlchemy set of records into a list

    :param records:
    :return: list
    """
    result_list = []
    for row in records:
        result_list.append(object_as_dict(row))
    return result_list


# ---------------------------------------------------------------------
# Web Application Routes: STATIC PAGES
# ---------------------------------------------------------------------

@MyDashboardApp.route("/")  # http://localhost:5000/
def index_page():
    return render_template('index.html',
                           page="home")


@MyDashboardApp.route("/clock")
def clock_page():
    return render_template('clock.html',
                           page='clock')


@MyDashboardApp.route("/about")
def about_page():
    return render_template('about.html',
                           page="about")


@MyDashboardApp.route("/cpu-temp")
def cpu_temp_graph():
    return render_template('cpu-temp.html',
                           page="CPU Temperature")


@MyDashboardApp.route("/cpu-load")
def cpu_load_graph():
    return render_template('cpu-load.html',
                           page="CPU Load")


@MyDashboardApp.route("/env-temp")
def env_temp_graph():
    return render_template('env-temp.html',
                           page="Environmental Temperature")


# app name
@MyDashboardApp.errorhandler(404)
# inbuilt function which takes error as parameter
def not_found(e):
    # defining function
    return render_template("404.html",
                           page="404")


# ---------------------------------------------------------------------
# API Routes: CPU-Temperature
# ---------------------------------------------------------------------

@MyDashboardApp.route("/api/CPU")
@cross_origin()
def cpu():
    return cpu_count()


@MyDashboardApp.route("/api/CPU/<int:count>")
@cross_origin()
def cpu_count(count=1):
    return cpu_count_start(count)


@MyDashboardApp.route("/api/CPU/<int:count>/<int:start>")
@cross_origin()
def cpu_count_start(count=1, start=1):
    if start < 1:
        start = 1
    session = sessionmaker(bind=engine)()
    # organise the data in reverse order
    reverse_data_query = session.query(Sensor).order_by(desc(Sensor.id))
    # now retrieve the number of records required
    result_proxy = reverse_data_query.limit(count).offset(start).all()
    cpu_temp_records = records_to_list(result_proxy)
    cpu_temp_json = jsonify(cpu_temp_records)
    session.close()
    return cpu_temp_json


# ---------------------------------------------------------------------
# API Routes: Sensehat
# ---------------------------------------------------------------------

@MyDashboardApp.route("/api/sensehat")
@cross_origin()
def sense_hat():
    return sense_hat_count()


@MyDashboardApp.route("/api/sensehat/<int:count>")
@cross_origin()
def sense_hat_count(count=1):
    return sense_hat_count_start(count)


@MyDashboardApp.route("/api/sensehat/<int:count>/<int:start>")
@cross_origin()
def sense_hat_count_start(count=1, start=1):
    if start < 1:
        start = 1
    session = sessionmaker(bind=engine)()
    # organise the data in reverse order
    reverse_data_query = session.query(Sensehat_TPH) \
        .order_by(desc(Sensehat_TPH.id))
    # now retrieve the number of records required
    result_proxy = reverse_data_query.limit(count).offset(start).all()
    sense_hat_temperature_records = records_to_list(result_proxy)
    sense_hat_temperature_json = jsonify(sense_hat_temperature_records)
    session.close()
    return sense_hat_temperature_json


if __name__ == '__main__':
    MyDashboardApp.run()
