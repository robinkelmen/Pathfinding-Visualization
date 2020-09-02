import { MinPriorityQueue, QueueItem } from "./PriorityQueue";

export const astar = (start, goal, grid) => {
  var openSet = new MinPriorityQueue();

  var closedSet = [];
  start.gscore = 0;
  console.log("openset");

  let newNode = new QueueItem(start, getDistance(goal, start));

  openSet.insert(newNode);
  let childrenCount = 0;
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
    const  childToAdd;
    const lowestCost;
    const lowestF;
    
    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      let isClosed = false;

      for (let j = 0; j < closedSet.length; j++) {
        if (closedSet[j] === neighbour) isClosed = true;
      }
      if (isClosed) continue;

      var g =
        currentnode.getItem().gscore +
        getDistance(neighbour, currentnode.getItem());

      var h = getDistance(goal, neighbour);

      var f = g + h;

      if (g < neighbour.gscore) {
        childToAdd = neighbour;
        lowestCost = g;
        lowestF = f;

        //neighbour.isVisited = true;
      }
      childToAdd.previousNode = currentnode.getItem();
      childToAdd.gscore = g;
      if (!openSet.contains(neighbour)) {
        console.log("found a child that is worthy");
        openSet.insert(new QueueItem(childToAdd, lowestF));
      }
    }
  }
  return closedSet;
};
//manhatan distance
function getDistance(node, target) {
  //eucledian distance
  var x = Math.abs(target.col - node.col);
  var y = Math.abs(target.row - node.row);

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

  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);

  if (row > 0) neighbours.push(grid[row - 1][col]);
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
