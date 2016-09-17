

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  // this._collisions = {};
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  // if (this._storage.get(index) !== undefined) {
  //   while(this._storage.get(index) !== undefined) {
  //     index = index + 1;
  //   }
  //   this._collisions[k] = index;
  // }
  var block = [k, v];
  if (this._storage.get(index) === undefined) {
    this._storage.set(index, [block]);
  } else {
    var blocks = this._storage.get(index);
    blocks.push(block);
    this._storage.set(index, blocks);
  }
};

HashTable.prototype.retrieve = function(k) {
  // var index = this._collisions[k] !== undefined ? 
  //               this._collisions[k] :
  var index = getIndexBelowMaxForKey(k, this._limit);
  var blocks = this._storage.get(index);
  var answer;
  blocks.forEach(function(block) {
    if (block[0] === k) {
      answer = block[1];
    }
  });
  console.log(answer);
  return answer;
};

HashTable.prototype.remove = function(k) {
  // var index = this._collisions[k] !== undefined ? 
  //               this._collisions[k] :
  var index = getIndexBelowMaxForKey(k, this._limit);
  var blocks = this._storage.get(index);
  // var blockSplicePosition;
  blocks.forEach(function(block, ind) {
    if (block[0] === k) {
      // blockSplicePosition = ind;
      blocks.splice(ind, 1);
    }
  });
  // this._storage.set(index, blocks);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


