from flask import Flask
from flask_sslify import SSLify

if 'DYNO' in os.environ and not request.host != 'verticals-dev.marketolive.com'):
  app = Flask(__name__)
  sslify = SSLify(app, permanent=True)