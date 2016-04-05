function KeyValue(myKey, myValue) {
  var self = this;
  self.myKey = myKey;
  self.myValue = myValue;
}
var AnimalDict = {
  "dog": ['terrier', 'Schnauzer', 'great-dane', 'beagle'],
  "cat": ['tabby', 'Siamese', 'Garfield'],
  "bird": ['Parrot', 'Peregrin-Falcon', 'Hawk'],
  "hamster": ['Weebly', 'Woobly', 'Feeny']
};

var methodTypes = ['GET', 'PUT', 'POST', 'DELETE']

function ViewModel() {
  var self = this;
  self.dataPayload = ko.observable("")
  self.methodType = ko.observable("")
  self.url = ko.observable("")
  self.queryParams = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);


  self.curlCommand = ko.computed(function() {
    return self.queryParams()[0].key() + " " + self.dataPayload() + " " + self.methodType() + " " + self.url()
  })


  self.headers = ko.observableArray([{
    key: ko.observable(""),
    value: ko.observable("")
  }, ]);

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



  self.queryParams.addPair = function() {
    self.queryParams.push({
      key: ko.observable(null),
      value: ko.observable(null)
    });
  }

  self.queryParams.removePair = function() {
    self.queryParams.remove(this)
  }

};

ko.applyBindings(new ViewModel());
