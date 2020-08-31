import React, { Component } from "react";
import Node from "./Node/Node";
import "./Visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = createGrid();
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    return (
      <div className="visualizer">
        foo
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

const createGrid = () => {
  const nodes = [];
  for (let col = 0; col < 30; col++) {
    const currentcol = [];
    for (let row = 0; row < 30; row++) {
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
    isStart: false,
    isTarget: false,
    isVisited: false,
    isWall: false,
    gscore: Infinity,
    previousNode: null,
  };
};
