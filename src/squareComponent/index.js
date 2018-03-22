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
          // "randomized" class gets added to change background to purple for shuffle animation
          className={`front ${this.props.randomized ? "randomized" : ""}`}
          // Can only click a card if the game is ready
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
