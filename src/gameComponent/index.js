import React, { Component } from "react";
import Board from "../boardComponent";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(20).fill(false)
    };
  }

  handleClick(tileIndex) {
    console.log("clicked a square", tileIndex);
    let clickCount = this.state.tiles.slice();
    if (
      clickCount.filter(clicked => clicked).length < 2 ||
      clickCount[tileIndex] //Is the tile already clicked?
    ) {
      // set the clicked tile's value in tiles array to T/F
      clickCount[tileIndex] = !clickCount[tileIndex];
      this.setState({ tiles: clickCount });
    }
  }

  render() {
    return (
      <div>
        <h1>This is a Game of Memory</h1>
        {/* Gotta use curlies if you want to pass a number */}
        {/* <Timer startTime={10} /> */}
        <Board
          tiles={this.state.tiles}
          name="Boardy McBoardface"
          imgCount={20}
          onClick={i => this.handleClick(i)}
        />
      </div>
    );
  }
}

export default Game;
