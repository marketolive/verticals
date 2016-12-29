from app import app
from flask import render_template, flash, request, redirect, g, abort, make_response, send_from_directory

import os

app_dir = os.path.abspath(os.path.dirname(__file__))

########################################################
#
#				Base Template and Index
#					
########################################################

# The following should contain a comprehensive list of languages and pages
# These are used to validate incoming URLs
# languages = ['en', 'jp']
# categories = ['solutions', 'verticals']
# pages = ['base', 'b2b', 'email-marketing', 'lead-management', 'consumer-marketing', 
# 		 'customer-base-marketing', 'mobile-marketing', 'higher-education',
# 		 'financial-services', 'healthcare']

pages = ['base', 'custombase','travel','healthcare','technology','manufacturing',
		'highered','assetmgmt','financialservices','facebook','economist',
		'hparameswaran']




@app.route('/')
def no_language():
	return redirect('/technology')
	
@app.route('/facebook')
def facebook():
 	return send_from_directory(os.path.join(app_dir, 'templates'), 'facebook.html')

@app.route('/economist')
def economist():
 	return send_from_directory(os.path.join(app_dir, 'templates'), 'economist.html') 	


@app.route('/js/<path:file_name>')
def serve_js(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'js'), file_name)

@app.route('/img/<path:file_name>')
def serve_images(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'img'), file_name) #'static/images/', file_name)

@app.route('/css/<path:file_name>')
def serve_css(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'css'), file_name)

@app.route('/font/<path:file_name>')
def serve_fonts(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'font'), file_name)


@app.route('/font-awesome/<path:file_name>')
def serve_font_awesome(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'font-awesome'), file_name)

@app.route('/<page>')
def main_route(page):
	if page in pages:
		return render_template(page+'.html',
								title='test',
								category= 'travel')


