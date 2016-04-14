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
var editorModes = ['text', 'json', 'xml']

/*var editorModes = [
   { value: 'text', name: 'Plain Text' },
   { value: 'json', name: 'JSON' },
   { value: 'xml', name: 'XML' }
]*/

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

  editor.getSession().on('change', function(e) {
    editorContent = editor.getValue()
      //editorContent = JSON.stringify(JSON.parse(editorContent))
    if (self.editorMode() == 'json') {
      editorContent = editorContent.replace(/[ \n\t]/g,'');
      console.log(editorContent)
    }
  });

  self.headers = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);

  self.curlCommand = ko.computed(function() {
    this.queryParameters = "?"
    for (var i = 0; i < self.queryParams().length; i++) {
      this.queryParameters = this.queryParameters + self.queryParams()[i].key() + "=" + self.queryParams()[i].value()
      if (i < self.queryParams().length - 1) {
        this.queryParameters = this.queryParameters + "&"
      }
    }

    this.headers = ""
    for (var i = 0; i < self.headers().length; i++) {
      this.headers = this.headers + " --header \"" + self.headers()[i].key() + ": " + self.headers()[i].value() + "\""
    }
    return "curl --verbose " + this.headers + " --data \"" + editorContent + "\"--request \"" + self.methodType() + "\" \"" + self.url() + this.queryParameters + "\""
  })




  self.headers.getSuggestedValues = function(pair) {
    return ko.computed(function() {
      return AnimalDict[pair.key()];
    });
  };

  // Callbacks
  self.headers.addHeader = function() {
    self.headers.push({
      key: ko.observable(null),
      value: ko.observable(null)
    });
  }
  self.headers.removeHeader = function() {
    self.headers.remove(this)
  }



  self.queryParams.addQueryParam = function() {
    self.queryParams.push({
      key: ko.observable(null),
      value: ko.observable(null)
    });
  }

  self.queryParams.removeQueryParam = function() {
    self.queryParams.remove(this)
  }

};

ko.applyBindings(new ViewModel());
