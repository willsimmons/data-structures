var StackFunc = function() {
  var someInstance = {};
  var items = 0;

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    storage[items] = value;
    items++;
  };

  someInstance.pop = function() {
    items--;
    if (items < 0) {
      items = 0;
    }
    return storage[items];
  };

  someInstance.size = function() {
    return items;
  };

  return someInstance;
};

var makeManyStacksFunctional = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var stackfunc = StackFunc();
    array.push(stackfunc);
  }
  return array;
};

var manyStacksFunctional = makeManyStacksFunctional();
