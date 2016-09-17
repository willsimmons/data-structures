describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    bloomFilter = new BloomFilter();
  });

  //test cases

  it('should contain functions "insert", and "check"', function() {
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.check).to.be.a('function');
  });

  it('should return false for empty bloomFilter', function() {
    var data = ['Tony Tan', 'Will Simmons', 'JP Zivalich', 'Cash Weaver'];
    data.forEach(function(name) {
      expect(bloomFilter.check(name)).to.be.false;
    });
  });

  it('should return true for an inserted string', function() {
    var data = ['Tony Tan', 'Will Simmons', 'JP Zivalich', 'Cash Weaver'];
    bloomFilter.insert(data[0]);
    expect(bloomFilter.check(data[0])).to.be.true;
  });
  
  it('should return false for uninserted strings', function() {
    var data = ['Tony Tan', 'Will Simmons', 'JP Zivalich', 'Cash Weaver'];
    var counter = 1;
    bloomFilter.insert(data[0]);
    expect(bloomFilter.check(data[1])).to.be.false;
    expect(bloomFilter.check(data[2])).to.be.false;
    for (var i = 0; i < 10000; i++) {
      if (bloomFilter.check(data[1])) {
        console.log('false positive');
      }
    }
    console.log(counter / 10000);
  });

});