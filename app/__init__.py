from flask import Flask
from flask_sslify import SSLify

app = Flask(__name__)
app.config.from_object('config')

if app.config['FORCE_SSL'] and 'DYNO' in os.environ and not app.debug:
  sslify = SSLify(app, permanent=True)

from app import views