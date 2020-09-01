import React, { Component } from "react";
import Node from "./Node/Node";
import "./Visualizer.css";
import { astar, pathOrder } from "../Algorithms/astar";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const TARGET_NODE_ROW = 27;
const TARGET_NODE_COL = 25;
const GRID_SIZE_ROW = 30;
const GRID_SIZE_COL = 30;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = createGrid(GRID_SIZE_ROW, GRID_SIZE_COL);
    this.setState({ nodes });
  }
  visualize() {
    const { nodes } = this.state;
    const start = nodes[START_NODE_ROW][START_NODE_COL];
    const goal = nodes[TARGET_NODE_ROW][TARGET_NODE_COL];
    const closedSet = astar(start, goal, nodes);
    const path = pathOrder(goal);
    this.animateStart(closedSet, path);
  }
  animateStart(closedSet, path) {
    console.log("trying to animate");
    for (let i = 0; i <= closedSet.length; i++) {
      if (i === closedSet.length) {
        setTimeout(() => {
          this.animatePath(path);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const { nodes } = this.state;
        const start = nodes[START_NODE_ROW][START_NODE_COL];
        const node = closedSet[i].getItem();
        if (node !== start) {
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  }
  animatePath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const { nodes } = this.state;
        const start = nodes[START_NODE_ROW][START_NODE_COL];

        const node = path[i];
        if (node !== start) {
          console.log(node);
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  render() {
    const { nodes } = this.state;
    return (
      <div className="visualizer">
        foo
        <button onClick={() => this.visualize()}>Start Visual</button>
        {nodes.map((mycol, colindex) => {
          return (
            <div key={colindex}>
              {mycol.map((node, nodeindex) => {
                const {
                  row,
                  col,
                  isTarget,
                  isStart,
                  isWall,
                  isVisited,
                  gscore,
                  previousNode,
                } = node;
                return (
                  <Node
                    key={nodeindex}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isTarget={isTarget}
                    isVisited={isVisited}
                    isWall={isWall}
                    gscore={gscore}
                    previousNode={previousNode}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const createGrid = (x, y) => {
  const nodes = [];
  for (let col = 0; col < x; col++) {
    const currentcol = [];
    for (let row = 0; row < y; row++) {
      currentcol.push(createNode(col, row));
    }

    nodes.push(currentcol);
  }
  return nodes;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_COL && col === START_NODE_ROW,
    isTarget: row === TARGET_NODE_COL && col === TARGET_NODE_ROW,
    isVisited: false,
    isPath: false,
    isWall: false,
    gscore: Infinity,
    previousNode: null,
  };
};
