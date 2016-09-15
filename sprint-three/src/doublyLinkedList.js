var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToHead = function(value) {
    var node = new Node(value);
    if (this.head !== null) {
      node.next = this.head;
      this.head.previous = node;
    }
    this.head = node;
    if (this.tail === null) {
      this.tail = node;
    }
  };

  list.addToTail = function(value) {
    var node = new Node(value);
    if (this.tail !== null) {
      this.tail.next = node;
      node.previous = this.tail;
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
        this.head.previous = null;
      }
      return result.value;
    }
  };

  list.removeTail = function() {
    if (this.tail !== null) {
      var result = this.tail;
      if (this.tail.previous === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.previous;
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
  node.previous = null;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
