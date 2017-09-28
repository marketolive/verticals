from app import app
from flask import render_template, flash, request, redirect, g, abort, make_response, send_from_directory

import os

app_dir = os.path.abspath(os.path.dirname(__file__))

########################################################
#
#				Base Template and Index
#					
########################################################

verticals = [
	'asset-management',
	'healthcare',
	'higher-education',
	'manufacturing',
	'mobile-provider',
	'retail-banking',
	'sports',
	'technology',
	'telecommunications',
	'travel-and-leisure'
]

ad_networks = [
	'facebook',
	'google'
]

pages = [
  'base',
  'cleanbase',
  'custombase',
  'base-simple',
  'facebook',
  'facebook_tivo',
  'economist',
  'wsj',
  'search_manufacturing_static',
  'searchasset_static',
  'search_health_care_static',
  'search_higher_ed_static',
  'search_fin_serv_static',
  'search_tech_static',
  'search_travel_static',
  'search_telecom_static',
  'search_dvr_static',
	'New-advances-in-pediatric-healthcare',
  'Encourage-investments-in-long-term-health',
  'Cutting-screening-time-at-hospital',
	'Marketing-in-Higher-Ed-How-to-Improve-Your-Grades',
  'Higher-Education-A-Changing-World-for-Marketers',
  'How-Digital-Marketing-is-Reshaping-Financial-Services',
	'Digital-Marketing-Trends','Role_of_Banks_In_Our_Economy',
  'Digital-Marketing-Trends',
	'Cross-Sell-to-Your-Customers',
  'The-Rise-of-Digital-Marketing-in-Financial-Services',
	'mktodemoaccount317',
  'mktodemoaccount201',
  'channel_engagement',
  'blog-page',
  'auto-close',
  'reloaded'
]

@app.route('/js/<path:file_name>')
def serve_js(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'js'), file_name)

@app.route('/img/<path:file_name>')
def serve_images(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'img'), file_name)

@app.route('/css/<path:file_name>')
def serve_css(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'css'), file_name)

@app.route('/font/<path:file_name>')
def serve_fonts(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'font'), file_name)

@app.route('/images/<path:file_name>')
def serve_images_old(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'img'), file_name)

@app.route('/font-awesome/<path:file_name>')
def serve_font_awesome(file_name):
	return send_from_directory(os.path.join(app_dir, 'static', 'font-awesome'), file_name)

@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app_dir, 'static', 'img'), 'favicon.ico')

@app.route('/<page>')
def main_router(page):
	if page in pages:
		return render_template(page + '.html')
	elif page in verticals:
		return redirect('/microsite/' + page)

@app.route('/microsite/<vertical>')
def microsite_router(vertical):
	if vertical in verticals:
		return render_template('microsite/' + vertical + '.html', vert = vertical)
	else:
		abort(404)

@app.route('/ad-retargeting/<ad_network>/<vertical>')
def ad_router(ad_network, vertical):
	if ad_network in ad_networks and vertical in verticals:
		return render_template('ad-retargeting/' + ad_network + '.html', vert = vertical)
	else:
		abort(404)

@app.route('/')
def no_page():
	return redirect('/microsite/technology')

@app.route('/facebook')
def facebook():
 	return send_from_directory(os.path.join(app_dir, 'templates'), 'facebook.html')

@app.route('/economist')
def economist():
 	return send_from_directory(os.path.join(app_dir, 'templates'), 'economist.html')

# Custom Demo Account
@app.route('/mktodemoaccount317')
def serve_custom317():
	return send_from_directory(os.path.join(app_dir, 'templates', 'custompages'), 'mktodemoaccount317.html')

@app.route('/mktodemoaccount201')
def serve_custom201():
	return send_from_directory(os.path.join(app_dir, 'templates', 'custompages'), 'mktodemoaccount201.html')

@app.route('/predictive-content')
@app.route('/predictive-content-106')
@app.route('/predictive-content-106d')
def predictive_content():
  return render_template('predictive-content.html')

@app.route('/predictive-assets/<asset>')
def predictive_asset(asset):
  return render_template('predictive-assets.html', content=asset)

@app.route('/predictive-assets-106/<asset>')
def predictive_asset_106(asset):
  return render_template('predictive-assets-106.html', content=asset)

@app.route('/predictive-assets-106d/<asset>')
def predictive_asset_106d(asset):
  return render_template('predictive-assets-106d.html', content=asset)