var QueuePseudo = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.front = 0;
  this.back = 0;
};

QueuePseudo.prototype.enqueue = function(value) {
  this.storage[this.back] = value;
  this.back++;
};

QueuePseudo.prototype.dequeue = function() {
  var result = this.storage[this.front];
  this.front++;
  if (this.front > this.back) {
    this.front = this.back;
  }
  return result;
};

QueuePseudo.prototype.size = function() {
  return this.back - this.front;
};

var makeManyQueuePsuedoclassical = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var queue = new QueuePseudo();
    array.push(queue);
  }
  return array;
};

var manyQueuePsuedoclassical = makeManyQueuePsuedoclassical();