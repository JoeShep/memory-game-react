import React, { Component } from "react";
import "./square.css";

class Square extends Component {
  render() {
    return (
      <div className={`flipcard h ${this.props.className ? "flipped" : ""}`}>
        <div className="front" onClick={() => this.props.onClick()}></div>
        <div className="back" onClick={() => this.props.onClick()}>
          <img src={this.props.image} alt=""/>
        </div>
      </div>
    );
  }
}

export default Square;
