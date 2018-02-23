import React, { Component } from "react";
import Board from "../boardComponent";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(20).fill(false),
      clickedIds: []
    };
  }

  handleClick(tileIndex, tileId) {
    console.log("clicked a square", tileId);
    let clickCount = this.state.tiles.slice();
    let clickedIds = this.state.clickedIds.slice();
    if (
      clickCount.filter(clicked => clicked).length < 2 ||
      clickCount[tileIndex] //Is the tile already clicked?
    ) {
      // set the clicked tile's value in tiles array to T/F
      clickCount[tileIndex] = !clickCount[tileIndex];
      this.setState({ tiles: clickCount });
      // adds the id of the clicked tile to clickedIds state prop
      clickedIds.push(tileId);
      console.log("clickedIds", clickedIds);
      // setState is async!
      this.setState({ clickedIds }, () => {
        console.log("id state", this.state.clickedIds);
        this.checkMatch();
      });
    }
  }

  checkMatch() {
    let matched = this.state.clickedIds[0] === this.state.clickedIds[1] ? "Matched!" : "No match"
    console.log("matched?", matched);
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
          media={this.props.media}
          onClick={(i, tileId) => this.handleClick(i, tileId)}
        />
      </div>
    );
  }
}

export default Game;
