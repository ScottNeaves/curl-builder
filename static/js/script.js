var editor = ace.edit("editor")
editor.setTheme("ace/theme/monokai")
editor.getSession().setMode("ace/mode/javascript");
var editorContent = ""
editor.getSession().on('change', function(e) {
    editorContent = editor.getValue()
});

var AnimalDict = {
  "dog": ['terrier', 'Schnauzer', 'great-dane', 'beagle'],
  "cat": ['tabby', 'Siamese', 'Garfield'],
  "bird": ['Parrot', 'Peregrin-Falcon', 'Hawk'],
  "hamster": ['Weebly', 'Woobly', 'Feeny']
};

var methodTypes = ['GET', 'PUT', 'POST', 'DELETE']
var editorModes = ['Text', 'JSON', 'XML']

function ViewModel() {
  var self = this;
  self.dataPayload = ko.observable("")
  self.methodType = ko.observable("")
  self.url = ko.observable("")
  self.queryParams = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);
  self.editorMode = ko.observable(editorModes[1])
  self.editorMode.subscribe(function(){
      console.log("hi")
      editor.getSession().setMode(self.editorMode())
  });
  self.headers = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);

  self.curlCommand = ko.computed(function() {
    this.queryParameters = "?"
    for (var i = 0; i < self.queryParams().length; i++){
      this.queryParameters = this.queryParameters + self.queryParams()[i].key() + "=" + self.queryParams()[i].value() +"&"
    }

    this.headers = ""
    for (var i = 0; i < self.headers().length; i++){
      this.headers = this.headers + " --header \"" + self.headers()[i].key() + ": " + self.headers()[i].value() + "\""
    }
    return "curl --verbose " + this.headers + " --data \"" + editorContent + "\" --request " + self.url() + this.queryParameters + " " + self.dataPayload()+ " " + self.methodType()
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
