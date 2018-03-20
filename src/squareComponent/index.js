import React, { Component } from "react";
import "./square.css";

class Square extends Component {
  render() {
    return (
      <div id={this.props.id} className={
          `flipcard
          ${this.props.flipped ? "flipped" : ""}`
        }>
        <div
          className={`front ${this.props.randomized ? "randomized" : ""}`}
          onClick={this.props.gameState === 'find' ? () => this.props.onClick() : null}>
        </div>
        <div className={`back ${this.props.matched ? "matched" : ""}`} onClick={() => this.props.onClick()}>
          <img src={this.props.image} alt=""/>
        </div>
      </div>
    );
  }
}

export default Square;
