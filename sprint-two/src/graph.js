

// Instantiate a new graph
var Graph = function() {
  this.nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes[node] = { value: node, edges: [] };
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodes[node] !== undefined;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  var that = this;
  this.forEachNode(function(otherNode) {
    that.removeEdge(otherNode, node);
  });
  delete this.nodes[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.nodes[fromNode].edges.indexOf(toNode) !== -1;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.nodes[fromNode].edges.push(toNode);
  this.nodes[toNode].edges.push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  var removeOneEdge = function(node1, node2) {
    var index = this.nodes[node1].edges.indexOf(node2);
    this.nodes[node1].edges.splice(index, 1);
  };

  if (this.nodes[fromNode].edges.indexOf(toNode) !== -1) {
    removeOneEdge.call(this, fromNode, toNode);
    removeOneEdge.call(this, toNode, fromNode);
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (node in this.nodes) {
    cb(node);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


