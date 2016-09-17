//create a bloom 3 hash 16 bit bloom filter
var BloomFilter = function() {
  this.storage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.limit = this.storage.length;
};

BloomFilter.prototype.insert = function(data) {
  // will hash data with 3 different hashing functions
  // will put the resulting bits into the bloomFilter array at the correct spots
  // returns true or false
  //var index1 = this.hashOne(data);
  var index2 = this.hashTwo(data);
  //var index3 = this.hashThree(data);
  //this.storage[index1] = 1;
  this.storage[index2] = 1;
  //this.storage[index3] = 1;
  console.log("inserting: ", data, index1, index2, index3, this.storage);
};

BloomFilter.prototype.check = function(testData) {
  // will hash testData 3 times
  // will compare the results with the corresponding bloom filter storage indices
    // if any zeros, return false, else return true
    //returns true or false
  //var index1 = this.hashOne(testData);
  var index2 = this.hashTwo(testData);
  //var index3 = this.hashThree(testData);
  //console.log("checking: ", testData, index1, index2, index3, this.storage);
  //return !!(this.storage[index1] && this.storage[index2] && this.storage[index3]);
};

BloomFilter.prototype.hashOne = function (string) {
  var hash = '' + fnv32a(string);
  return this.convertHash(hash, this.limit);  
};

BloomFilter.prototype.hashTwo = function (string) {
  var j = new Jenkins();
  var hash = '' + j.hash32(string);
  console.log('jenkins(hashTwo)', hash, typeof hash, this.convertHash(hash, this.limit));
  return this.convertHash(hash, this.limit);  
};

BloomFilter.prototype.hashThree = function (string) {
  return getIndexBelowMaxForKey(string, this.limit);  
};

BloomFilter.prototype.convertHash = function (hash) {
  var answer = 0;
  var currChar;

  for (var i = 0; i < hash.length; i++) {
    currChar = hash[i]; //I presume you can convert chart to digit yourself.
    console.log(currChar);
    answer = (answer * 16 + currChar) % this.limit;
    console.log(answer);
  }

  return answer;
};


