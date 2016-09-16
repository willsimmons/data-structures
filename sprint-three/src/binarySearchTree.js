var BinarySearchTree = function(value) {
  var bST = Object.create(bSTmethods);
  bST.value = value;
  bST.left = null;
  bST.right = null;
  return bST;
};

var bSTmethods = {};

bSTmethods.insert = function(value) {
  if (value < this.value) {
    if (this.left === null) {
      this.left = BinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  } else {
    if (this.right === null) {
      this.right = BinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  }
};

bSTmethods.contains = function(value) {
  if (this.value === value) {
    return true;
  } else {
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  }
};

bSTmethods.depthFirstLog = function(cb) {
  cb(this.value);
  if (this.left !== null) {
    this.left.depthFirstLog(cb);
  }
  if (this.right !== null) {
    this.right.depthFirstLog(cb);
  }
};

bSTmethods.breadthFirstLog = function(cb) {
  var queue = new Queue();
  var currNode;
  queue.enqueue(this);
  while (queue.size() > 0) {
    currNode = queue.dequeue();
    cb(currNode.value);
    if (currNode.left !== null) {
      queue.enqueue(currNode.left);
    }
    if (currNode.right !== null) {
      queue.enqueue(currNode.right);
    }
  }
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
