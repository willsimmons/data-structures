var BinarySearchTree = function(value) {
  var bST = Object.create(bSTmethods);
  bST.value = value;
  bST.left = null;
  bST.right = null;
  bST.parent = null;
  bST.count = 1;
  return bST;
};

var bSTmethods = {};

bSTmethods.insert = function(value) {
  if (value < this.value) {
    if (this.left === null) {
      this.left = BinarySearchTree(value);
      this.left.parent = this;
      this.left.atCount();
      if (this.left.needsRebalancing()) {
        var head = this.findHead();
        head.rebalance();
      } 
    } else {
      //for the first node
      this.left.insert(value);
    }
  } else {
    if (this.right === null) {
      this.right = BinarySearchTree(value);
      this.right.parent = this;
      this.right.atCount();
      if (this.right.needsRebalancing()) {
        var head = this.findHead();
        head.rebalance();
      }
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

bSTmethods.currMaxDepth = function() {
  return this.leftDepth > this.rightDepth ? this.leftDepth : this.rightDepth;
};

bSTmethods.computeMinDepth = function() {
  var count = this.currCount;
  return Math.ceil(Math.log2(count + 1));
};

bSTmethods.rebalance = function() {
  var rebalancer = function(node) {
    var result = [node.value];
    if (node.left !== null) {
      result = rebalancer(node.left).concat(result);
    }
    if (node.right !== null) {
      result = result.concat(rebalancer(right));
    }
    return result;
  };
  var arr = rebalancer(this);
  var insertSortedArray = function(array, node) {
    if (array.length === 0) {
      return;
    } else {
      var centerIndex = Math.floor(array.length / 2); 
      var centerValue = array[centerIndex];
      node.value = centerValue;
      var leftArray = array.slice(0, centerIndex);
      var rightArray = array.slice(centerIndex + 1);
      if (leftArray.length !== 0) {
        node.left = BinarySearchTree();
        node.left.parent = node;
        node.left.atCount();
        insertSortedArray(leftArray, node.left);
      }
      if (rightArray.length !== 0) {
        node.right = BinarySearchTree();
        node.right.parent = node;
        node.right.atCount();
        insertSortedArray(rightArray, node.right);
      }
    }
  };
  insertSortedArray(arr, this);
};

bSTmethods.needsRebalancing = function() {
  var depth = 1;
  var currNode = this;
  var nodeCount;
  while (currNode.parent !== null) {
    depth ++;   
    currNode = currNode.parent;  
  }
  nodeCount = currNode.count;   
  var mathStuff = (depth * 1.0 / Math.ceil(Math.log2(nodeCount + 1)));
  var answer = mathStuff > 2;
  return answer;
};

bSTmethods.findHead = function() {
  var currNode = this;
  while (currNode !== null) {
    currNode = currNode.parent;
    if (currNode.parent === null) {
      return currNode;  
    }
  }
};   

bSTmethods.atCount = function() {
  var parent = this.parent;
  while (parent !== null) {
    parent.count++;
    parent = parent.parent;
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
