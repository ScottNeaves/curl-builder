from flask import Flask
from flask import render_template
from flask.ext.pymongo import PyMongo
from flask import request, jsonify
from datetime import datetime
app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        return render_template("index.html")

@app.route('/saveSnippet', methods=['POST'])
def saveSnippet():
    data = request.get_json()
    print data
    curlCommandDb = mongo.db.savedCurls.insert_one(data).inserted_id
    print curlCommandDb
    print mongo.db.savedCurls.count()
    return 'hi'

if __name__ == '__main__':
    app.run(debug=True)
