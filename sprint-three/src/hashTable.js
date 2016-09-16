var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  k = JSON.stringify(k);

  var index = getIndexBelowMaxForKey(k, this._limit);
  var block = [k, v];
  if (this._storage.get(index) === undefined) {
    this._storage.set(index, [block]);
  } else {
    var blocks = this._storage.get(index);
    blocks.push(block);
    this._storage.set(index, blocks);
  }
  this._count++;
  if (this.percentfull() >= 75) {
    this.resize('expand');
  }
};

HashTable.prototype.retrieve = function(k) {
  k = JSON.stringify(k);

  var index = getIndexBelowMaxForKey(k, this._limit);
  var blocks = this._storage.get(index);
  var answer = undefined;
  if (blocks !== undefined) {
    blocks.forEach(function(block) {
      if (block[0] === k) {
        answer = block[1];
      }
    });
  }

  return answer;
};

HashTable.prototype.remove = function(k) {
  k = JSON.stringify(k);

  var index = getIndexBelowMaxForKey(k, this._limit);
  var blocks = this._storage.get(index);
  blocks.forEach(function(block, ind) {
    if (block[0] === k) {
      blocks.splice(ind, 1);
    }
  });
  this._count--;
  if (this.percentfull() < 25) {
    this.resize('contract');
  }
};

// make your hashTable double in size or halve in size
HashTable.prototype.resize = function(expandOrContract) {
  var oldStorage = this._storage;
  var oldLimit = this._limit;

  if (expandOrContract === 'expand') {
    this._limit *= 2;
  } else if (expandOrContract === 'contract') {
    this._limit /= 2;
  }

  this._storage = LimitedArray(this._limit);
  this._count = 0;

  var newIndex, currKey, currValue;
  var that = this;

  oldStorage.each(function(blocks) {
    if (blocks !== undefined) {
      blocks.forEach(function(block) {
        // ugly fix for insertion without JSON.stringify
        newIndex = getIndexBelowMaxForKey(block[0], that._limit);
        if (that._storage.get(newIndex) === undefined) {
          that._storage.set(newIndex, [block]);
        } else {
          var newBlocks = that._storage.get(newIndex);
          newBlocks.push(block);
          that._storage.set(newIndex, newBlocks);
        }
        that._count++;
      });
    }
  });
};


HashTable.prototype.percentfull = function() {
  return Math.floor(this._count * 100 / this._limit);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


