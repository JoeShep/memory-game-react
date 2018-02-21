import React, { Component } from "react";
import "./square.css";

class Square extends Component {
  render() {
    return (
      <div className={`flipcard h ${this.props.className ? "flipped" : ""}`}>
        <button className="front" onClick={() => this.props.onClick()}>
          {this.props.squareChar}
          This is the front side
        </button>
        <button className="back" onClick={() => this.props.onClick()}>
          {this.props.squareChar}
          This is the back side
        </button>
      </div>
    );
  }
}

export default Square;
