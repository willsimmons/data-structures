

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._collisions = {};
  this._keys = [];
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  this._keys.push(k);
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) !== undefined) {
    while (this._storage.get(index) !== undefined) {
      index = (index + 1) % this._limit;
    }
    this._collisions[k] = index;
  }
  this._count++;
  this._storage.set(index, v);
  // To prevent excessive collisions, make your hashTable double in size as soon as 75 percent of the spaces have been filled
  if (this.percentfull() >= 75) {
    this.resize('expand');
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = this._collisions[k] !== undefined ? 
                this._collisions[k] :
                getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(index);
};

HashTable.prototype.remove = function(k) {
  var keyindex = this._keys.indexOf(k);
  this._keys.splice(k, 1);
  var index = this._collisions[k] !== undefined ? 
                this._collisions[k] :
                getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
  this._count--;
  // To save space, make sure the hashTable halves in size when space usage falls below 25 percent
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

  var oldIndex, newIndex, currValue;
  var that = this;
  this._keys.forEach(function(key) {
    oldIndex = getIndexBelowMaxForKey(key, oldLimit);
    currValue = oldStorage.get(oldIndex);
    newIndex = getIndexBelowMaxForKey(key, that._limit);
    if (that._storage.get(newIndex) !== undefined) {
      while (that._storage.get(newIndex) !== undefined) {
        newIndex = newIndex + 1;
      }
      that._collisions[key] = newIndex;
    }
    that._storage.set(newIndex, currValue);
  });
};


HashTable.prototype.percentfull = function() {
  return Math.floor(this._count * 100 / this._limit);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


