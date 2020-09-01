import { MinPriorityQueue, QueueItem } from "./PriorityQueue";

export const astar = (start, goal, grid) => {
  var openSet = new MinPriorityQueue();

  var closedSet = [];
  start.gscore = 0;
  console.log("openset");

  let newNode = new QueueItem(start, getDistance(goal, start));

  openSet.insert(newNode);

  while (!openSet.isEmpty()) {
    const currentnode = openSet.pop();
    currentnode.getItem().isVisited = true;

    closedSet.push(currentnode);
    //if (currentnode === null) break;
    if (currentnode.getItem() === goal) {
      console.log("path found");
      break;
    }
    const neighbours = getNeighbours(currentnode.getItem(), grid);

    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      let isClosed = false;

      for (let j = 0; j < closedSet.length; j++) {
        if (closedSet[j] === neighbour) isClosed = true;
      }
      if (isClosed) continue;

      var g = currentnode.getItem().gscore + 1;

      var h = getDistance(goal, neighbour);

      var f = g + h;

      if (g < neighbour.gscore) {
        neighbour.previousNode = currentnode.getItem();
        neighbour.gscore = g;
        //neighbour.isVisited = true;
        if (!openSet.contains(neighbour)) {
          openSet.insert(new QueueItem(neighbour, f));
        }
      }
    }
  }
  return closedSet;
};
function getDistance(node, target) {
  //eucledian distance
  var x = Math.pow(target.col - node.col, 2);
  var y = Math.pow(target.row - node.row, 2);

  var distance = x + y;
  return distance;
}
function getLoc(node) {
  const { col, row } = node;
  return { col, row };
}
function getNeighbours(node, grid) {
  const neighbours = [];
  const { row, col } = node;

  if (col > 0) neighbours.push(grid[col - 1][row]);
  if (col < grid[0].length - 1) neighbours.push(grid[col + 1][row]);

  if (row > 0) neighbours.push(grid[col][row - 1]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  console.log(col, row);
  console.log(node);
  console.log(neighbours);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}
export const pathOrder = (goal) => {
  const path = [];
  let current = goal;
  while (current !== null) {
    path.push(current);
    current = current.previousNode;
  }
  return path;
};
