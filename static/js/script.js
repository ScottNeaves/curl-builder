//For the method dropdown. Shows currently selected method type.
$(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown").find('#methodType').html($(this).text())+ ' <span class="caret"></span>';
});

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

function ViewModel() {
  var self = this;
  self.selectedPet = ko.observable("")
  self.selectedBreed = ko.observable("")
  self.dataPayload = ko.observable("")
  self.methodType = ko.observable("")
  self.url = ko.observable("")

  self.curlCommand = ko.computed(function(){
    return self.selectedPet() + " " + self.selectedBreed() + " " + self.dataPayload() + " " + self.methodType() + " " + self.url()
  })

  self.headers = ko.observableArray([
    {key: ko.observable(""), value:ko.observable("")},
  ]);

  self.headers.getSuggestedValues = function(pair){
    return ko.computed(function () {
                return AnimalDict[pair.key()];
            });
  };

  // Callbacks
  self.headers.addHeader = function() {
    self.headers.push({key: ko.observable(null), value: ko.observable(null)});
  }
  self.headers.removeHeader = function() {
    self.headers.remove(this)
  }

};

ko.applyBindings(new ViewModel());
