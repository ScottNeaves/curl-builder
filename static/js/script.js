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
  dog: ['terrier', 'Schnauzer', 'great-dane', 'beagle'],
  cat: ['tabby', 'Siamese', 'Garfield'],
  bird: ['Parrot', 'Peregrin-Falcon', 'Hawk'],
  hamster: ['Weebly', 'Woobly', 'Feeny']
};

console.log(Object.keys(AnimalDict))
// Overall viewmodel for this screen, along with initial/ state
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

  // Editable data
  self.pairs = ko.observableArray([
    {announce: "Hi", pet: "thisPet"}
  ]);


    // Operations
    self.addKVPair = function() {
      self.pairs.push({announce: "Hi", pet: self.selectedPet});
    }
    self.removePair = function() {
      self.pairs.remove(this)
    }
};

ko.applyBindings(new ViewModel());
