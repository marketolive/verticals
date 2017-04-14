from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

if app.config['FORCE_SSL'] and not app.debug:
  from flask_sslify import SSLify
  sslify = SSLify(app)

from app import views