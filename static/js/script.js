var editor = ace.edit("editor")
editor.setTheme("ace/theme/chrome")
editor.getSession().setMode("ace/mode/javascript");
editor.setOption("showPrintMargin", false)
var editorContent = ""

var AnimalDict = {
  "dog": ['terrier', 'Schnauzer', 'great-dane', 'beagle'],
  "cat": ['tabby', 'Siamese', 'Garfield'],
  "bird": ['Parrot', 'Peregrin-Falcon', 'Hawk'],
  "hamster": ['Weebly', 'Woobly', 'Feeny']
};

var methodTypes = ['GET', 'PUT', 'POST', 'DELETE']
  //var editorModes = ['text', 'json', 'xml']

var editorModes = [{
  value: 'text',
  name: 'Plain Text'
}, {
  value: 'json',
  name: 'JSON'
}, {
  value: 'xml',
  name: 'XML'
}]

function ViewModel() {
  var self = this;
  self.dataPayload = ko.observable("")
  self.methodType = ko.observable("")
  self.url = ko.observable("")
  self.queryParams = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);
  self.editorMode = ko.observable("json")
  self.editorMode.subscribe(function() {
    editor.getSession().setMode("ace/mode/" + self.editorMode())
  });
  self.username = ko.observable("")
  self.password = ko.observable("")
  self.editorContentObservable = ko.observable("")
  editor.getSession().on('change', function(e) {
    editorContent = editor.getValue()
    self.editorContentObservable(editorContent)
    if (self.editorMode() == 'json') {
      editorContent = editorContent.replace(/[ \n\t]/g, '');
      self.editorContentObservable(editorContent)
    }
    if (editorContent != "") {
      editorContent = '--data \'' + editorContent
      self.editorContentObservable(editorContent)
    }
  });
  self.formatText = function() {
    if (self.editorMode() == 'json') {
      editor.setValue(JSON.stringify(JSON.parse(editorContent), null, '\t'));
    }
  }
  self.headers = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);


  self.curlCommand = ko.computed(function() {
    this.queryParameters = ''
    if (self.queryParams()[0].key() != '') {
      this.queryParameters = "?"
    }
    for (var i = 0; i < self.queryParams().length; i++) {
      if (self.queryParams()[i].key() != '' && self.queryParams()[i].value() != '') {
        this.queryParameters = this.queryParameters + self.queryParams()[i].key() + "=" + self.queryParams()[i].value()
        if (i < self.queryParams().length - 1) {
          this.queryParameters = this.queryParameters + "&"
        }else{
          this.queryParameters = this.queryParameters + "\""
        }
      }
    }
    this.headers = ""
    for (var i = 0; i < self.headers().length; i++) {
      if (self.headers()[i].key() != '' && self.headers()[i].value() != '') {
        this.headers = this.headers + " --header \"" + self.headers()[i].key() + ": " + self.headers()[i].value() + "\""
      }
    }

    var authString = '';
    if (self.username() != '') {
      authString = ' --user \'' + self.username() + ":" + self.password() + "\'"
    }


    return "curl --verbose " + this.headers + self.editorContentObservable() + "\' --request \"" + self.methodType() + "\" \"" + self.url() + "\"" + this.queryParameters + authString
  })

  self.headers.getSuggestedValues = function(pair) {
    return ko.computed(function() {
      return AnimalDict[pair.key()];
    });
  };

  // Callbacks
  self.headers.addHeader = function() {
    self.headers.push({
      key: ko.observable(''),
      value: ko.observable('')
    });
  }
  self.headers.removeHeader = function() {
    self.headers.remove(this)
  }



  self.queryParams.addQueryParam = function() {
    self.queryParams.push({
      key: ko.observable(''),
      value: ko.observable('')
    });
  }

  self.queryParams.removeQueryParam = function() {
    self.queryParams.remove(this)
  }

};

ko.applyBindings(new ViewModel());
