var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var counter = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    counter++;
  };

  someInstance.dequeue = function() {
      counter--;
    if (counter < 0) {
      counter = 0;
    }
  };

  someInstance.size = function() {
    return counter;
  };

  return someInstance;
};
