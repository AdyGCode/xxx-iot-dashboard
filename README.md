# XXX IoT Dashboard

A core project template for the analysis of current technologies and 
their application to industry - specifically within Internet of Things.

This code base is not complete, but **no** contributions are required.

## General Information

* Free software: Open Software License ("OSL") v. 3.0
* Documentation: To be added


## Features

* Display readings in numerical format for Temperature, Pressure, Humidity and other details
* Display readings for the sensor in numerical format for the CPU load, CPU Temperature and 
  other details
* Data display updated every 10 seconds with no page refresh

Possible additions:
* Graph data

## Requirements

This code presumes certain hardware is being used.

### Hardware:
* Raspberry Pi 3B or later

### Package Requirements

This project requires the following package(s):

| Package | Purpose | Recommended Version |
|------------------|-----------------------------------|----------------|
| `psutils`  | system utilities | v5.8.0 or later |
| `piview`  | Raspberry Pi Information package | v2.0.3 or later |
| `flask`  | Flask framework for web apps | v2. or later |
| `flask-cors`  | Flask CORS support for web apps | v3.0.10 or later |
| `paho-mqtt`  | Python MQTT package  | v1.5.1 or later |
| `SQLAlchemy`  | Python ORM for SQL databases  | v1.4.17 or later |
| `mysql-connector-python`  | MySQL Connector for Python | v8.0.25 or later |
  

Remaining packages are Python 'built-ins'.

### Package Installation

The requirements above may be installed using:

```shell
pip3 install PACKAGE_NAME
```
or using the PyCharm Project Preferences


## Credits


## Copyright

Copyright Adrian Gould, 2021 onwards. 
Licensed under the Open Software License version 3.0

Please credit the author whenever this code is used in any capacity.
