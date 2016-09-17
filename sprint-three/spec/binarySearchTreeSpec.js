describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", "breadthFirstLog", "depthFirstLog",  "currMaxDepth", computeMinDepth", and "rebalance"', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.breadthFirstLog).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
    expect(binarySearchTree.currMaxDepth).to.be.a('function');
    expect(binarySearchTree.computeMinDepth).to.be.a('function');
    expect(binarySearchTree.rebalance).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3]);
  });

  //.breadthFirstLog() method for binarySearchTee, logs the nodes contained in the tree using a breadth-first approach
  it('should execute a callback on every value in a tree using "breadthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5, 2, 7, 3, 6]);
  });

  // Make your binarySearchTree rebalance as soon as the max depth is more than twice the minimum depth

  it('should rebalance when max depth is more that twice the minimum depth', function() {
    binarySearchTree.insert(4);
    binarySearchTree.insert(3);
    binarySearchTree.insert(2);
    binarySearchTree.insert(1);
    binarySearchTree.insert(0);
    
    var arrayBefore = [];
    var funcBefore = function(value) { arrayBefore.push(value); };
    binarySearchTree.breadthFirstLog(funcBefore);
    expect(arrayBefore).to.eql([5, 4, 3, 2, 1, 0]);
    
    binarySearchTree.insert(-1); // rebalancing should happen here (7 > log 2 (7 + 1)) 
    var arrayAfter = [];
    var funcAfter = function(value) { arrayAfter.push(value); };
    binarySearchTree.breadthFirstLog(funcAfter);
    console.log(arrayAfter);
    expect(arrayAfter).to.eql([2, 0, 4, -1, 1, 3, 5]);
  });

});
