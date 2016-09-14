var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = {};
  
  instance.storage = {};
  instance.count = 0;
  instance.push = stackMethods.push;
  instance.pop = stackMethods.pop;
  instance.size = stackMethods.size;

  return instance;
};

var stackMethods = {
  push: function(value) {
    this.count++;
  },
  pop: function() {
    this.count--;
  },
  size: function() {
    return this.count;
  }
};


