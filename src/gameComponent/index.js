import React, { Component } from "react";
import Board from "../boardComponent";
// import EndGame from "../endGameComponent";

class Game extends Component {

  handleClick(tileIndex, tileId) {
    // Can't use slice here because state.tiles is an array of objects. slice doesn't "deep copy" objects in arrays, so the new array still references the objects in the state array. Using map and Object.assign takes care of that
    let clickCount = this.props.gameState.tiles.map(tile =>
      Object.assign({}, tile)
    );
    let matchCount = this.props.gameState.matchCount;
    this.flipCard(clickCount, tileIndex, tileId)
    .then((flipped) => {
      if(flipped) {
        let clickedTiles = this.props.gameState.clickedTiles.slice();
        if (this.props.gameState.clickedTiles.length === 2) {
          if (this.checkMatch()) {
            clickCount[tileIndex].matched = true;
            clickCount[clickedTiles[0].position].matched = true;
            setTimeout( () => { this.updateMatchState(clickCount, matchCount) }, 200);
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
      }
    });
  }

  flipCard(clickCount, tileIndex, tileId) {
    let clickedTiles = this.props.gameState.clickedTiles.slice();
    return new Promise( (resolve, reject) => {
      if (
        // if flipped + the ones who are matched (which are also flipped)
        clickCount.filter(clicked => clicked.flipped).length - this.props.gameState.matchCount * 2 < 2
        &&
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
            resolve(this.props.setGameState({ clickedTiles }));
          })
      } else {
        resolve(null);
      }
    });
  }

  updateMatchState(clickCount, matchCount) {
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
