var StackPseudo = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.count = 0;
};

StackPseudo.prototype.push = function(value) {
  this.storage[this.count] = value;
  this.count++;
};

StackPseudo.prototype.pop = function() {
  this.count--;
  if (this.count < 0) {
    this.count = 0;
  }
  return this.storage[this.count];
};

StackPseudo.prototype.size = function(value) {
  return this.count;
};

var makeManyStacksPseudoclassical = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var stack = new StackPseudo();
    array.push(stack);
  }
  return array;
};

var manyStacksPseudoclassical = makeManyStacksPseudoclassical();