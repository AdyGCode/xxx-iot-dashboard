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


@MyDashboardApp.route("/graph-demo")
def graph_demo():
    return render_template('graph-demo.html',
                           page="graph-demo")


# ---------------------------------------------------------------------
# API Routes: CPU-Temperature
# ---------------------------------------------------------------------

@MyDashboardApp.route("/api/CPU-Temperature")
@cross_origin()
def cpu_temperature():
    cpu_temperature_count_start(1, 1)


@MyDashboardApp.route("/api/CPU-Temperature/<int:count>")
@cross_origin()
def cpu_temperature_count(count):
    cpu_temperature_count_start(count)


@MyDashboardApp.route("/api/CPU-Temperature/<int:count>/<int:start>")
@cross_origin()
def cpu_temperature_count_start(count, start):
    if start > 0:
        start -= 1
    # organise the data in reverse order
    reverse_data_query = session.query(Sensor) \
        .order_by(desc(Sensor.date_recorded))
    # now retrieve the number of records required
    result_proxy = reverse_data_query.limit(count).offset(start).all()
    cpu_temp_records = records_to_list(result_proxy)
    cpu_temp_json = jsonify(cpu_temp_records)
    return cpu_temp_json


# ---------------------------------------------------------------------
# API Routes: CPU-Load
# ---------------------------------------------------------------------

@MyDashboardApp.route("/api/CPU-Load")
@cross_origin()
def cpu_load():
    cpu_load_count_start(1, 1)


@MyDashboardApp.route("/api/CPU-Load/<int:count>")
@cross_origin()
def cpu_load_count(count):
    cpu_load_count_start(count)


@MyDashboardApp.route("/api/CPU-Load/<int:count>/<int:start>")
@cross_origin()
def cpu_load_count_start(count, start):
    if start > 0:
        start -= 1
    # organise the data in reverse order
    reverse_data_query = session.query(Sensor) \
        .order_by(desc(Sensor.date_recorded))
    # now retrieve the number of records required
    result_proxy = reverse_data_query.limit(count).offset(start).all()
    cpu_load_records = records_to_list(result_proxy)
    cpu_load_json = jsonify(cpu_load_records)
    return cpu_load_json


# TODO: Create the API calls for at least one of:
#       SenseHAT Temperature
#       SenseHAT Pressure
#       SenseHAT Humidity
# ---------------------------------------------------------------------
# TODO: Change the X to the desired data:
#       temperature, pressure, or humidity
# API Routes: Sensehat-X
# ---------------------------------------------------------------------

@MyDashboardApp.route("/api/sensehat-X")
@cross_origin()
def sensehat_x():
    sensehat_x_count(1)


@MyDashboardApp.route("/api/sensehat-X/<int:count>")
@cross_origin()
def sensehat_x_count(count):
    sensehat_x_count_start(count, 1)


@MyDashboardApp.route("/api/sensehat-X/<int:count>/<int:start>")
@cross_origin()
def sensehat_x_count_start(count, start):
    if start > 0:
        start -= 1
    # organise the data in reverse order
    reverse_data_query = session.query(Sensehat_TPH) \
        .order_by(desc(Sensehat_TPH.date_recorded))
    # now retrieve the number of records required
    result_proxy = reverse_data_query.limit(count).offset(start).all()
    sensehat_x_records = records_to_list(result_proxy)
    sensehat_x_json = jsonify(sensehat_x_records)
    return sensehat_x_json


if __name__ == '__main__':
    MyDashboardApp.run()
