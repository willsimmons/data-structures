var StackProto = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = Object.create(stackMethods);
  instance.storage = {};
  instance.count = 0;
  return instance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[this.count] = value;
  this.count++;
};

stackMethods.pop = function() {
  this.count--;
  if (this.count < 0) {
    this.count = 0;
  }
  return this.storage[this.count];
};

stackMethods.size = function() {
  return this.count;
};

// Stack.prototype.push = function(value) {
//   this.storage[this.count] = value;
//   this.count++;
// };

// Stack.prototype.pop = function() {
//   this.count--;
//   if (this.count < 0) {
//     this.count = 0;
//   }
//   return this.storage[this.count];
// };

// Stack.prototype.size = function() {
//   return this.count;
// };

var makeManyStacksPrototypal = function() {
  var array = [];
  for (var i = 0; i < 100000; i++) {
    var stack = StackProto();
    array.push(stack);
  }
  return array;
};

var manyStacksPrototypal= makeManyStacksPrototypal();