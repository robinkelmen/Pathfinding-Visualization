import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isStart, isTarget } = this.props;
    const variableClassName = isStart
      ? "node_start"
      : isTarget
      ? "node_target"
      : "";

    return <div className={`node ${variableClassName}`}></div>;
  }
}
