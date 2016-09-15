

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._collisions = {};
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) !== undefined) {
    while(this._storage.get(index) !== undefined) {
      index = index + 1;
    }
    this._collisions[k] = index;
  }
  this._count++;
  // To prevent excessive collisions, make your hashTable double in size as soon as 75 percent of the spaces have been filled
  if (this.percentfull() > 75) {
    this.expand();
  }
  this._storage.set(index, v);
};

HashTable.prototype.retrieve = function(k) {
  var index = this._collisions[k] !== undefined ? 
                this._collisions[k] :
                getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(index);
};

HashTable.prototype.remove = function(k) {
  var index = this._collisions[k] !== undefined ? 
                this._collisions[k] :
                getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
  this._count--;
  // To save space, make sure the hashTable halves in size when space usage falls below 25 percent
  if (this.percentfull() < 25) {
    this.contract();
  }
};

// make your hashTable double in size
HashTable.prototype.expand = function() {
  var oldStorage = this._storage;
  this._limit *= 2;
  this._storage = LimitedArray(this._limit);
  this._collisions = {};
  var that = this;
  oldStorage.each(function(value) {
    var index = getIndexBelowMaxForKey(k, that._limit);
    if (that._storage.get(index) !== undefined) {
      while (that._storage.get(index) !== undefined) {
        index = index + 1;
      }
      that._collisions[k] = index;
    }
    that._storage.set(index, v);
  });
};

// make your hashTable halve in size
HashTable.prototype.contract = function() {
  var oldStorage = this._storage;
  this._limit /= 2;
  this._storage = LimitedArray(this._limit);
  this._collisions = {};
  var that = this;
  oldStorage.each(function(value) {
    var index = getIndexBelowMaxForKey(value, that._limit);
    if (that._storage.get(index) !== undefined) {
      while (that._storage.get(index) !== undefined) {
        index = index + 1;
      }
      that._collisions[k] = index;
    }
    that._storage.set(index, v);
  });
};

HashTable.prototype.percentfull = function() {
  return Math.floor(this._count * 100 / this._limit);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


