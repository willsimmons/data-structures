var Stack = function() {
  var someInstance = {};
  var items = 0;

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    storage["items"] = value;
    items++;
  };

  someInstance.pop = function() {
    var result = storage["items"];
    delete storage["items"];
    items--;
    return result;
  };

  someInstance.size = function() {
    if (items < 0) {
      items = 0;
    }
    return items;
  };

  return someInstance;
};
