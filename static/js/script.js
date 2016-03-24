// Class to represent a row in the seat reservations grid
function KeyValue(name, initialMeal) {
    var self = this;
    self.name = name;
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
