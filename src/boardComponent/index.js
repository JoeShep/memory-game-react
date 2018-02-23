import React, { Component } from "react";
import Square from '../squareComponent';
import "./board.css";

class Board extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      // "key" is required when dynamically adding multiple instances
      rows.push(
        <Square
          className={this.props.tiles[i]}
          key={i}
          image={this.props.images[i]}
          squareChar={i + 1}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    return <div className="board">{rows}</div>;
  }
}

export default Board;
