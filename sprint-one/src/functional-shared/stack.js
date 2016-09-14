var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = stackMethods;
  return instance;
};

var stackMethods = {
  storage: {},
  count: 0,
  push: function(value) {
    this.count++;
  },
  pop: function() {

  },
  size: function() {
    return this.count;
  }
};


