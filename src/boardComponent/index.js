import React, { Component } from "react";
import Square from "../squareComponent";
import "./board.css";

class Board extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      let tileId = this.props.media[i].id;
      // "key" is required when dynamically adding multiple instances so React can keep track
      rows.push(
        <Square
          flipped={this.props.tiles[i].flipped}
          id={tileId+i}
          matched={this.props.tiles[i].matched}
          key={i}
          image={this.props.media[i].imgUrl}
          squareChar={i + 1}
          onClick={() => this.props.onClick(i, tileId)}
        />
      );
    }
    return <div className="board">{rows}</div>;
  }
}

export default Board;
