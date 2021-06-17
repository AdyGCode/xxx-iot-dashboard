# ---------------------------------------------------------------------
# File:     /DB.py
# Project:  xxx-iot-dashboard
# Author:   STUDENT NAME <STUDENT@EMAIL-ADDRESS>
# Created:  5/05/2021
# Purpose:  Provides dashboard.py with the Database Connectivity and
#           table structures to allow the dashboard.py application to
#           display the data as tables, graphs or other formats.
# ---------------------------------------------------------------------

import urllib.parse

from sqlalchemy import BigInteger, Boolean, Column, DateTime, Float, func, \
    Integer, SmallInteger, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Define the database connection details
# TODO: Remember to change the xxx to your initials
db_server = "localhost"
db_port = 3306
db_username = "xxx_iot"
db_password = "Password1"
db_database = "xxx_iot"
db_engine = "mysql+mysqlconnector"

# Create a SQL safe password by escaping any special characters
db_safe_pw = urllib.parse.quote_plus(db_password)
# Create the database connection string
db_connect = f"{db_engine}://{db_username}:{db_safe_pw}@{db_server}" \
             f"/{db_database}"


class Sensehat_TPH(Base):
    """
    TODO: Add a description to this class

    TODO: Before working on the Environment class, check and complete the
          sensor class as it has lots of examples.
    """
    __tablename__ = "iot_sensehat_tph"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    topic = Column(String(255), default="ERROR")
    client = Column(String(255), default="ERROR")
    data = Column(Text, default="ERROR")
    temperature = Column(Float, default=-999.9)
    pressure = Column(Float, default=-999.9)
    humidity = Column(Float, default=-999.9)
    acceleration_x = Column(Float, default=0.0)
    acceleration_y = Column(Float, default=0.0)
    acceleration_z = Column(Float, default=0.0)
    pitch = Column(Float, default=0.0)
    yaw = Column(Float, default=0.0)
    roll = Column(Float, default=0.0)
    compass = Column(SmallInteger, default=0)
    recorded_at = Column(DateTime, default="1000-01-01 00:00:00")
    created_at = Column(DateTime, server_default=func.now())

    def __init__(self):
        pass

    def __str__(self):
        return_string = f"{self.id:>6x} {self.topic}" \
                        f"{self.client} {self.data}"
        return return_string


class Sensor(Base):
    """
    Sensor Table Class

    Used to provide the table structure to SQLAlchemy for it to automatically
    create the table on first run of the server.

    This table stores each individual item of data from the sensor.
    """
    __tablename__ = "iot_sensors"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    topic = Column(String(255), default="ERROR")
    client = Column(String(255), default="ERROR")
    data = Column(Text, default="ERROR")
    sensor_name = Column(String(64), default="UNKNOWN")
    message = Column(Text, default=None)
    model = Column(String(128), default="UNKNOWN")
    ip = Column(String(32), default="999.999.999.999")
    mac = Column(String(32), default='zz:zz:zz:zz:zz:zz')
    boot_time = Column(DateTime, default='1000-01-01 00:00:00')
    ram_total = Column(Integer, default=0)
    ram_free = Column(Integer, default=0)
    storage_total = Column(BigInteger, default=0)
    storage_free = Column(BigInteger, default=0)
    hw_i2c = Column(Boolean, default=False)
    hw_bt = Column(Boolean, default=False)
    hw_camera_support = Column(Boolean, default=False)
    hw_camera_detected = Column(Boolean, default=False)
    hw_spi = Column(Boolean, default=False)
    recorded_at = Column(DateTime, default="1000-01-01 00:00:00")
    created_at = Column(DateTime, server_default=func.now())

    def __init__(self):
        pass

    def __str__(self):
        return_string = f"{self.id:>6x} {self.topic}" \
                        f"{self.client} {self.data}"
        return return_string
