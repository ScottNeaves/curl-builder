from flask import Flask
from flask import render_template, send_file, url_for, abort
from flask.ext.pymongo import PyMongo
import pymongo
from flask import request, jsonify
from datetime import datetime
from random import randint
import json
import bson
import os
from bson.json_util import dumps
from flask import redirect
app = Flask(__name__)
mongo = PyMongo(app)
MONGODB_URI = 'mongodb://heroku_xb2s6jq8:o6fl8m09ivcodo14ip9outul3p@ds011943.mlab.com:11943/heroku_xb2s6jq8'
client = pymongo.MongoClient(MONGODB_URI)
db = client.get_default_database()
savedCurls = db['savedCurls']

@app.route('/', methods=['GET'])
def hello_world_home():
    if request.method == 'GET':
        return render_template("index.html")

@app.route('/<int:code>', methods=['GET'])
def hello_world(code):
    if request.method == 'GET':
        return render_template("index.html")

@app.route('/saveSnippet', methods=['POST'])
def saveSnippet():
    data = request.get_json()
    data['randInt'] = randint(100000, 999999)
    #print data
    curlCommandDb = savedCurls.insert_one(data).inserted_id
    #print curlCommandDb
    #print mongo.db.savedCurls.count()
    return json.dumps({'code': data.get("randInt")});

#Write an endpoint /<abc123> that searches for the code in the collection and returns
#it to the client which then displays it in the form.
@app.route('/retrieveSnippet/<int:code>', methods=['POST'])
def loadCurl(code):
    if request.method == 'POST':
        print code
        curl = savedCurls.find_one({"randInt": code})
        return bson.json_util.dumps(curl)

port = int(os.environ.get("PORT", 5000))
app.run(debug=True, host='0.0.0.0', port = port)
