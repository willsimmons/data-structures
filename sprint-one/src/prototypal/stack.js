var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = Object.create(Stack.prototype);
  instance.storage = {};
  instance.count = 0;
  return instance;
};

var stackMethods = {
  push: function(value) {
  
  },
  pop: function() {

  },
  size: function() {
    return this.count;
  }
};

Stack.prototype.push = stackMethods.push;

Stack.prototype.pop = stackMethods.pop;

Stack.prototype.size = stackMethods.size;
