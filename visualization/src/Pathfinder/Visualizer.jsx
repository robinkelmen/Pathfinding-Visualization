import React, { Component } from "react";
import Node from "./Node/Node";
import "./Visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    const nodes = [];

    for (let col = 0; col < 30; col++) {
      const currentcol = [];
      for (let row = 0; row < 30; row++) {
        currentcol.push([]);
      }

      nodes.push(currentcol);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
      <div className="visualizer">
        foo
        {nodes.map((col, colindex) => {
          return (
            <div key={colindex}>
              {col.map((node, nodeindex) => (
                <Node key={nodeindex}></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
