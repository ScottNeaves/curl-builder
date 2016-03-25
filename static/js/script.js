// Class to represent a row in the seat reservations grid

$(function() {
   var availableTags = [
     "ActionScript",
     "AppleScript",
     "Asp",
     "BASIC",
     "C",
     "C++",
     "Clojure",
     "COBOL",
     "ColdFusion",
     "Erlang",
     "Fortran",
     "Groovy",
     "Haskell",
     "Java",
     "JavaScript",
     "Lisp",
     "Perl",
     "PHP",
     "Python",
     "Ruby",
     "Scala",
     "Scheme"
   ];
   $( "#KeyGuess" ).autocomplete({
     source: availableTags
   });
 });

function KeyValue(myKey, myValue) {
    var self = this;
    self.myKey=myKey;
    self.myValue=myValue;
}
// Overall viewmodel for this screen, along with initial state
function KVPairsViewModel() {
    var self = this;

    // Editable data
    self.pairs = ko.observableArray([
        new KeyValue("")
    ]);

    // Operations
    self.addKVPair = function() {
        self.pairs.push(new KeyValue(""));
    }
    self.removePair = function(pair) { self.pairs.remove(pair) }
}

ko.applyBindings(new KVPairsViewModel());
