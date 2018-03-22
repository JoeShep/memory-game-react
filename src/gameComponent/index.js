import React, { Component } from "react";
import Board from "../boardComponent";
// import EndGame from "../endGameComponent";

class Game extends Component {
  // constructor(props) {
  //   super(props);
  //   // may need to combine tiles' true/false with matched in single object
  //   this.state = {
  //     gameId: 1, //this allows us to create a new game by using it as an ID on a board and then incrementing it by 1 to force React to create a new Board instance
  //     tiles: Array(20).fill({ flipped: false, matched: false }),
  //     clickedTiles: [],
  //     // matched: false,
  //     matchCount: 0,
  //     gameState: "pregame"
  //   };
  // }
  // clicking a clicked tile is counting as a second clicked id and then it's making a match when it shouldn't
  handleClick(tileIndex, tileId) {
    console.log("clicked a square", tileId, "index", tileIndex);
    // Can't use slice here because state.tiles is an array of objects. slice doesn't "deep copy" objects in arrays, so the new array still references the objects in the state array. Using map and Object.assign takes care of that
    let clickCount = this.props.gameState.tiles.map(tile =>
      Object.assign({}, tile)
    );
    let clickedTiles = this.props.gameState.clickedTiles.slice();
    let matchCount = this.props.gameState.matchCount;
    if (
      clickCount.filter(clicked => clicked.flipped).length -
        this.props.gameState.matchCount * 2 <
        2 &&
      !clickCount[tileIndex].flipped //Is the tile already clicked?
    ) {
      // set the clicked tile's value in tiles array to T/F
      clickCount[tileIndex].flipped = !clickCount[tileIndex].flipped;
      // setState is async!
      this.props
        .setGameState({ tiles: clickCount })
        .then(() => {
          // adds only the id of a newly clicked tile to clickedIds state prop
          if (clickCount[tileIndex].flipped)
            clickedTiles.push({ id: tileId, position: tileIndex });
          return this.props.setGameState({ clickedTiles });
        })
        .then(() => {
          // console.log("id state", this.state.clickedTiles, "tiles", this.state.tiles);
          if (this.props.gameState.clickedTiles.length === 2) {
            console.log("about to checkMatch");
            if (this.checkMatch()) {
              clickCount[tileIndex].matched = true;
              clickCount[clickedTiles[0].position].matched = true;
              setTimeout(() => {
                this.props
                  .setGameState({
                    tiles: clickCount,
                    clickedTiles: [],
                    matchCount: matchCount + 1,
                    gameStage:
                      matchCount === 9 ? "over" : this.props.gameState.gameStage
                  })
                  .then(gameState => {
                    console.log("state after match", gameState);
                  });
              }, 200);
            } else {
              setTimeout(() => {
                clickCount[tileIndex].flipped = false;
                clickCount[clickedTiles[0].position].flipped = false;
                this.props.setGameState({
                  tiles: clickCount,
                  clickedTiles: []
                });
              }, 1300);
            }
          }
        });
    }
  }

  checkMatch() {
    console.log("ids clicked", this.props.gameState.clickedTiles);
    return this.props.gameState.clickedTiles[0].id ===
      this.props.gameState.clickedTiles[1].id
      ? true
      : false;
  }

  initGame() {
    console.log("start pressed");
    this.props.setGameState({ gameStage: "ready" });
    console.log("game state ready?", this.props.gameState.gameStage);
    setTimeout(() => this.props.setGameState({ gameStage: "shuffling" }), 800);
    setTimeout(() => this.props.setGameState({ gameStage: "find" }), 4500);
  }

  // Need to move this up to the top level and make it a component, too

  render() {
    return (
      <div>
        <h1>{this.props.hints[this.props.gameState.gameStage]}</h1>
        <button onClick={() => this.initGame()}>START</button>
        <Board
          key={this.props.gameState.gameId}
          tiles={this.props.gameState.tiles}
          imgCount={20}
          media={this.props.media}
          onClick={(i, tileId) => this.handleClick(i, tileId)}
          gameState={this.props.gameState.gameStage}
        />
      </div>
    );
    // } else {
    //   return (
    //     <EndGame
    //       gameState={this.props.gameState.gameStage}
    //       onClick={() => this.resetGame()}
    //     />
    //   );
  }
}

Game.defaultProps = {
  hints: {
    pregame: "This is a Game of Memory",
    ready: "Get Ready!",
    shuffling: "Shuffling!",
    find: "Find the famous pairs!",
    over: "You did it!"
  }
};

export default Game;
