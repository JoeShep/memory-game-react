import React, { Component } from "react";
import "./square.css";

class Square extends Component {
  render() {
    return (
      <div id={this.props.id} className={
          `flipcard
          h
          ${this.props.flipped ? "flipped" : ""}`
        }>
        <div className="front" onClick={() => this.props.onClick()}></div>
        <div className={`back ${this.props.matched ? "matched" : ""}`} onClick={() => this.props.onClick()}>
          <img src={this.props.image} alt=""/>
        </div>
      </div>
    );
  }
}

export default Square;
