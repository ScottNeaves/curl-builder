from flask import Flask
from flask import render_template
from flask.ext.pymongo import PyMongo
from flask import request, jsonify
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


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        return render_template("index.html") # post=helloDb

@app.route('/saveSnippet', methods=['POST'])
def saveSnippet():
    #username = request.args.get('username')
    #password = request.args.get('password')
    #dataPayload = request.args.get('dataPayload')
    #editorMode = request.args.get('editorMode')
    #methodType = request.args.get('methodType')
    #url = request.args.get('url')
    #fullString = username + ' ' + password + ' ' + dataPayload + ' ' + editorMode + ' ' + methodType + ' ' + url
    #return jsonify(result=fullString)
    data = request.get_json()
    print data
    curlCommandDb = mongo.db.savedCurls.insert_one(data).inserted_id
    print curlCommandDb
    print mongo.db.savedCurls.count()
    return 'hi'

if __name__ == '__main__':
    app.run(debug=True)
