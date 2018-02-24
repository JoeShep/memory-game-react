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
      matchCount: 0,
      gameState: 'pregame'
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
      clickCount.filter(clicked => clicked.flipped).length -
        this.state.matchCount * 2 <
        2 &&
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
          if (this.state.clickedTiles.length === 2) {
            if (this.checkMatch()) {
              clickCount[tileIndex].matched = true;
              clickCount[clickedTiles[0].position].matched = true;
              setTimeout(() => {
                this.setState({
                  tiles: clickCount,
                  matchCount: matchCount + 1,
                  clickedTiles: []
                });
              }, 200);
            } else {
              setTimeout(() => {
                clickCount[tileIndex].flipped = false;
                clickCount[clickedTiles[0].position].flipped = false;
                this.setState({ tiles: clickCount, clickedTiles: [] });
              }, 1300);
            }
          }
        });
      });
    }
  }

  checkMatch() {
    console.log("ids clicked", this.state.clickedTiles);
    return this.state.clickedTiles[0].id === this.state.clickedTiles[1].id
      ? true
      : false;
  }

  initGame() {
    this.setState({ gameState: 'ready' });
    setTimeout(() => this.setState({ gameState: 'shuffling' }), 800);
    setTimeout(() => this.setState({ gameState: 'find' }), 4500);
  }

  render() {
    return (
      <div>
        <h1>{this.props.hints[this.state.gameState]}</h1>
        <button onClick={() => this.initGame()}>START</button>
        <Board
          tiles={this.state.tiles}
          imgCount={20}
          media={this.props.media}
          onClick={(i, tileId) => this.handleClick(i, tileId)}
          gameState={this.state.gameState}
        />
      </div>
    );
  }
}

Game.defaultProps = {
  hints: {
    pregame: "This is a Game of Memory",
    ready: "Get Ready!",
    shuffling: "Shuffling!",
    find: "Find the famous pairs!"
  }
}

export default Game;
