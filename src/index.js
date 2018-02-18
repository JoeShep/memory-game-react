import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Board extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < 20; i++) {
      rows.push(
        <div className="square" key={i}>
          {i + 1}
        </div>
      );
    }
    return <div class="board">{rows}</div>;
  }
}

class Game extends Component {
  render() {
    return (
      <div>
        <h1>This is a Game of Memory</h1>
        <Board name="Boardy McBoardface" />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
