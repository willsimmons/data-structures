var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var node = new Node(value);
    if (this.tail !== null) {
      this.tail.next = node;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node;
    }
  };

  list.removeHead = function() {
    if (this.head !== null) {
      var result = this.head;
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }
      return result.value;
    }
  };

  list.contains = function(target) {
    var contains = false;
    var currNode = this.head;
    while (currNode !== null) {
      if (currNode.value === target) {
        contains = true;
      }
      currNode = currNode.next;
    }
    return contains;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
