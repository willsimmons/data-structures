var QueueFunc = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var front = 0;
  var back = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[back] = value;
    back++;
  };

  someInstance.dequeue = function() {
    var result = storage[front];
    front++;
    if (front > back) {
      front = back;
    }
    return result;
  };

  someInstance.size = function() {
    return back - front;
  };

  return someInstance;
};

var makeManyQueueFunctionals = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var queue = QueueFunc();
    array.push(queue);
  }
  return array;
};

var manyQueueFunc = makeManyQueueFunctionals();