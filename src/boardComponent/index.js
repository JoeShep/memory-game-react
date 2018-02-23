import React, { Component } from "react";
import Square from "../squareComponent";
import "./board.css";

class Board extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      let tileId = this.props.media[i].id;
      // "key" is required when dynamically adding multiple instances
      rows.push(
        <Square
          className={this.props.tiles[i]}
          id={tileId+i}
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
