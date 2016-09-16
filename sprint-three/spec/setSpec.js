describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should handle numbers', function() {
    set.add(3);
    expect(set.contains(3)).to.be.true;
    set.remove(3);
    expect(set.contains(3)).to.be.false;
  });

  it('should handle arrays', function() {
    set.add([1, 2, 3]);
    expect(set.contains([1, 2, 3])).to.be.true;
    set.remove([1, 2, 3]);
    expect(set.contains([1, 2, 3])).to.be.false;
  });

  it('should handle objects', function() {
    set.add({will: 'hello!', tony: 'hey!'});
    expect(set.contains({will: 'hello!', tony: 'hey!'})).to.be.true;
    set.remove({will: 'hello!', tony: 'hey!'});
    expect(set.contains({will: 'hello!', tony: 'hey!'})).to.be.false;
  });

});
