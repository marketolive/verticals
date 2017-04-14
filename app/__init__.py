from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

from app import views

if app.config['FORCE_SSL'] and 'DYNO' in os.environ and not app.debug:
  from flask_sslify import SSLify
  sslify = SSLify(app, permanent=True)