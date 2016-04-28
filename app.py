from flask import Flask
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
    helloDb = mongo.db.items.insert_one(post).inserted_id
    return render_template("index.html", post=helloDb)

if __name__ == '__main__':
    app.run(debug=True)
