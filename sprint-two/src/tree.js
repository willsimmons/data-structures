var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me
  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var node = new Tree(value);
  this.children.push(node);
};

treeMethods.contains = function(target) {
  var has = this.value === target;
  this.children.forEach(function(child) {
    has = has || child.contains(target);
  });
  return has;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
