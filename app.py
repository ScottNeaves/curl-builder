from flask import Flask
from flask import request
from flask import render_template
from flask.ext.pymongo import PyMongo
from datetime import datetime
app = Flask(__name__)
mongo = PyMongo(app)

post = {"headers": {},
        "qParams": {},
        "username": "john",
        "password": "doe",
        "dataType": "JSON",
        "data": "{testdata: hi}",
        "method": "GET",
        "URL": "www.google.com",
        "date": datetime.utcnow()}


@app.route('/')
def hello_world():
    #helloDb = mongo.db.items.insert_one(post).inserted_id
    return render_template("index.html") #post=helloDb

@app.route('/savesnippet', methods=['POST'])
def save_snippet():
    print 'I got here'
    username = request.form['username']
    print username
    password = request.form['password']
    url = request.form['url']
    print 'I got here 2'
    return "here is the info " + username + " " + password + " " + " " + url
    #return 'hi'

if __name__ == '__main__':
    app.run(debug=True)
