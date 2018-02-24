import React, { Component } from "react";
import Board from "../boardComponent";

class Game extends Component {
  constructor(props) {
    super(props);
    // may need to combine tiles' true/false with matched in single object
    this.state = {
      tiles: Array(20).fill({ flipped: false, matched: false }),
      clickedTiles: [],
      // matched: false,
      matchCount: 0
    };
  }

  // clicking a clicked tile is counting as a second clicked id and then it's making a match when it shouldn't
  handleClick(tileIndex, tileId) {
    console.log("clicked a square", tileId, "index", tileIndex);
    // Can't use slice here because state.tiles is an array of objects. slice doesn't "deep copy" objects in arrays, so the new array still references the objects in the state array. Using map and Object.assign takes care of that
    let clickCount = this.state.tiles.map(tile => Object.assign({}, tile));
    let clickedTiles = this.state.clickedTiles.slice();
    let matchCount = this.state.matchCount;
    if (
      clickCount.filter(clicked => clicked.flipped).length - (this.state.matchCount*2) < 2 &&
      !clickCount[tileIndex].flipped //Is the tile already clicked?
    ) {
      // set the clicked tile's value in tiles array to T/F
      clickCount[tileIndex].flipped = !clickCount[tileIndex].flipped;
      // setState is async!
      this.setState({ tiles: clickCount }, () => {
        // adds only the id of a newly clicked tile to clickedIds state prop
        if (clickCount[tileIndex].flipped)
          clickedTiles.push({ id: tileId, position: tileIndex });
        this.setState({ clickedTiles }, () => {
          // console.log("id state", this.state.clickedTiles, "tiles", this.state.tiles);
          if (this.state.clickedTiles.length === 2 && this.checkMatch()) {
            clickCount[tileIndex].matched = true;
            clickCount[clickedTiles[0].position].matched = true;
            this.setState(
              {
                tiles: clickCount,
                matchCount: matchCount + 1,
                clickedTiles: []
              },
              () => {
                console.log(
                  "matchcount",
                  this.state.matchCount,
                  "clicked length",
                  this.state.clickedTiles
                );
              }
            );
          }
        });
      });
    }
  }

  checkMatch() {
    console.log("ids clicked", this.state.clickedTiles);
    return this.state.clickedTiles[0].id === this.state.clickedTiles[1].id ? true : false;
  }

  render() {
    return (
      <div>
        <h1>This is a Game of Memory</h1>
        {/* Gotta use curlies if you want to pass a number */}
        {/* <Timer startTime={10} /> */}
        <Board
          tiles={this.state.tiles}
          imgCount={20}
          media={this.props.media}
          onClick={(i, tileId) => this.handleClick(i, tileId)}
        />
      </div>
    );
  }
}

export default Game;
