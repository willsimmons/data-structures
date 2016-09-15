var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.parent = null;
  newTree.children = [];  // fix me
  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  newTree.removeFromParent = treeMethods.removeFromParent;

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var node = new Tree(value);
  node.parent = this;
  this.children.push(node);
};

treeMethods.contains = function(target) {
  var has = this.value === target;
  this.children.forEach(function(child) {
    has = has || child.contains(target);
  });
  return has;
};

treeMethods.removeFromParent = function() {
  var parent = this.parent;
  // remove child from parent's children array
  var indexOfChild = parent.children.indexOf(this);
  parent.children.splice(indexOfChild, 1);
  // remove parent from child
  this.parent = null;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
