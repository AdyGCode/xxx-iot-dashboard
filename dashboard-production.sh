#!/usr/bin/env bash
FLASK_APP=dashboard.py FLASK_ENV=production python3 -m flask run --port=5000 --host=0.0.0.0
