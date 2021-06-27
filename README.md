# XXX IoT Dashboard

A core project template for the analysis of current technologies and their application to
industry - specifically within Internet of Things.

This code base is not complete. Contributions are **NOT** required.

## General Information

* Free software: Open Software License ("OSL") v. 3.0
* Documentation: To be added

## Features

This project includes the following features:
* Display readings in numerical format for Temperature, Pressure, Humidity and other details
* Display readings for the sensor in numerical format for the CPU load, CPU Temperature and
  other details
* Data display updated every 1 second with no page refresh

In progress items include pages for:
* Displaying the data in line chart form

The following are already functional:
* CPU Temperature
* Environmental Temperature
* CPU Max Load

## Requirements

This code presumes the use of certain hardware.

### Hardware:

* Raspberry Pi 3B or later

### Software:

The sensors and servers require software that includes:

* MySQL or MariaDB database server
* Python 3.7 or later
* Mosquitto (MQTT server)

### Package Requirements

The three projects, `xxx-iot-sensor`, `xxx-iot-server` and this one, `xxx-iot-dashboard`,
require the following package(s):

| Package                   | Purpose                              | Recommended Version |
|---------------------------|--------------------------------------|---------------------|
| `psutils`                 | system utilities                     | v5.8.0 or later     |
| `piview`                  | Raspberry Pi Information package     | v2.0.3 or later     |
| `flask`                   | Flask framework for web apps         | v2. or later        |
| `flask-cors`              | Flask CORS support for web apps      | v3.0.10 or later    |
| `paho-mqtt`               | Python MQTT package                  | v1.5.1 or later     |
| `SQLAlchemy`              | Python ORM for SQL databases         | v1.4.17 or later    |
| `SQLAlchemy UTCDateTime`  | UTC Date-Time support for SQLAlchemy | v1.0.4 or later     |
| `mysql-connector-python`  | MySQL Connector for Python           | v8.0.25 or later    |

Remaining packages are Python 'built-ins'.

### Package Installation

You may install the listed requirements using:

```shell
pip3 install PACKAGE_NAME 
```

or using the PyCharm Project Preferences

## Credits

## Copyright

Copyright Adrian Gould, 2021 onwards. Licensed under the Open Software License version 3.0

Whenever you use a part or all the code from the project, please remember to credit the author(
s) by using a link to this project and the name(s) of the author(s) in the comments
and `README.md` file.
