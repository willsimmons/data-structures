describe('expandedTree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree(8);
  });

  it('should have methods named "addChild", "contains", "traverse", and a property named "value"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.traverse).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('should correctly detect parents', function() {
    tree.addChild(5);
    tree.addChild(6);
    var parent = tree.children[0].parent;
    expect(parent.value).to.equal(8);
  });

  it('should correctly remove parents in both directions', function() {
    tree.addChild(5);
    tree.addChild(6);
    var child = tree.children[0];
    var parent = child.parent;
    expect(parent.children[0].value).to.equal(5);
    expect(child.parent).to.equal(parent);
    child.removeFromParent();
    expect(parent.children[0].value).to.not.equal(5);
    expect(child.parent).to.equal(null);
  });

// Implement a .traverse() method on your tree. Your .traverse() should accept a callback and execute it on every value contained in the tree
  it('should correctly traverse the tree and run a callback on each value', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.addChild(7);
    var array = [];
    tree.traverse(function(value) {
      array.push(value);
    });
    expect(array).to.eql([8, 5, 6, 7]);
  });
});
