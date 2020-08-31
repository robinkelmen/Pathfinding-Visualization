import { MinPriorityQueue, QueueItem } from "../algorithms/PriorityQueue";

function astar(start, goal, grid) {
  var openSet = new MinPriorityQueue();

  var closedSet = [];
  start.gscore = 0;

  openSet.insert(new QueueItem(start, getDistance(goal, start)));
  while (openSet.length != 0) {
    const currentnode = openSet.pop();
    closedSet.push(currentnode);

    if (currentnode == end) {
      console.log("path found");
    }
    const neighbours = getNeighbours(currentnode, grid);
    for (var i = 0; i < neighbours.length(); i++) {
      const neighbour = neighbours[i];
      const { gscore } = neighbour;
      var g = currentnode.gscore + getDistance(neighbour, currentnode);
      var h = getDistance(goal, neighbour);
      var f = g + h;
      if (g < gscore) {
        neighbour.previousNode = currentnode;
        neighbour.gscore = g;
        neighbour.isVisited = true;
        if (!openSet.contains(neighbour)) {
          openSet.push(new QueueItem(neighbour, f));
        }
      }
    }
  }
}
function getDistance(node, target) {
  var { col, row } = node;
  const ncol = col;
  const nrow = row;
  var { xcol, xrow } = target;

  var x = xcol - ncol;
  var y = xrow - nrow;
  var distance = (x + y) / 2;
  return distance;
}
function getNeighbours(node, grid) {
  const { col, row } = node;
  const neighbours = [];

  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  return neighbours.filter((neighbour) => !isVisited);
}
function pathOrder(goal) {
  const path = [];
  let current = goal;
  while (current != null) {
    path.push(current);
    current = current.previousNode;
  }
  return path;
}
