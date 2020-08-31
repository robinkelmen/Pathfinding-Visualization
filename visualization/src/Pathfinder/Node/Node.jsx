import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  handleClick() {
    console.log(
      "Location is" + "[" + this.props.col + "," + this.props.row + "]"
    );
  }
  render() {
    const {
      column,
      row,
      isStart,
      isTarget,
      isWall,
      isVisited,
      gscore,
      previousNode,
    } = this.props;
    const variableClassName = isStart
      ? "node_start"
      : isTarget
      ? "node_target"
      : "";

    return (
      <div
        id={`node-${row}-${column}`}
        className={`node ${variableClassName}`}
        onClick={() => this.handleClick()}
      ></div>
    );
  }
}
