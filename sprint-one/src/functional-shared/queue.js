var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = {};
  instance.storage = {};
  instance.front = 0;
  instance.back = 0;
  instance.enqueue = queueMethods.enqueue;
  instance.dequeue = queueMethods.dequeue;
  instance.size = queueMethods.size;
  return instance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.back++;
};

queueMethods.dequeue = function() {

};

queueMethods.size = function() {
  return this.back - this.front;
};
