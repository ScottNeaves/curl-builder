from flask import Flask
from flask import render_template, send_file, url_for, abort
from flask.ext.pymongo import PyMongo
from flask import request, jsonify
from datetime import datetime
from random import randint
import json
from flask import redirect
app = Flask(__name__)
mongo = PyMongo(app)


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        return render_template("index.html")

@app.route('/saveSnippet', methods=['POST'])
def saveSnippet():
    data = request.get_json()
    data['randInt'] = randint(100000, 999999)
    #Add random code
    #randIdentifier = randint(100000, 999999)
    #data.randIdentifier = randIdentifier
    print data
    curlCommandDb = mongo.db.savedCurls.insert_one(data).inserted_id
    print curlCommandDb
    print mongo.db.savedCurls.count()
    return redirect('/success')
    #return redirect("http://127.0.0.1:5000/success", code=303) #http://127.0.0.1:5000/success

@app.route('/success', methods=['GET'])
def success():
    print "Im here"
    return render_template("success.html")

if __name__ == '__main__':
    app.run(debug=True)
