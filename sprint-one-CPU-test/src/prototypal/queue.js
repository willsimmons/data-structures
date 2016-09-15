var QueueProto = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = Object.create(queueMethods);
  instance.storage = {};
  instance.front = 0;
  instance.back = 0;
  return instance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[this.back] = value;
  this.back++;
};

queueMethods.dequeue = function() {
  var result = this.storage[this.front];
  this.front++;
  if (this.front > this.back) {
    this.front = this.back;
  }
  return result;
};

queueMethods.size = function() {
  return this.back - this.front;
};

var makeManyQueuePrototypal = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var queueproto = QueueProto();
    array.push(queueproto);
  }
  return array;
};

var ManyQueuePrototypal = makeManyQueuePrototypal();