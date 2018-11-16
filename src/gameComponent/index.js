import React, { Component } from "react";
import Board from "../boardComponent";
import './game.css'

class Game extends Component {

  handleClick(tileIndex, tileId, audioUrl) {
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
            //set audioUrl state to current matched set's sound file url
            this.props.setGameState({
              audioUrl: audioUrl
            })
            .then( () => {
              this.props.playAudio()
            });

            clickCount[tileIndex].matched = true;
            clickCount[clickedTiles[0].position].matched = true;
            setTimeout( () => { this.updateMatchState(clickCount, matchCount) }, 400);
          } else {
            this.props.setGameState({
              audioUrl: "media/wrong.mp3"
            })
            .then(() => {
              clickCount[tileIndex].wrong = true;
              clickCount[clickedTiles[0].position].wrong = true;
              return new Promise( (resolve, reject) => {
                setTimeout(() => {
                  this.props.playAudio()
                  resolve(
                    this.props.setGameState({
                      tiles: clickCount
                    })
                  )
                }, 500)
              })
              .then( () => {
                setTimeout(() => {
                  clickCount[tileIndex].flipped = false;
                  clickCount[clickedTiles[0].position].flipped = false;
                  this.props.setGameState({
                      tiles: clickCount,
                      clickedTiles: []
                    })
                }, 1100);
              })
            })
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
        clickCount[tileIndex].wrong = false;
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
    this.props.setGameState({
      tiles: clickCount,
      clickedTiles: [],
      matchCount: matchCount + 1,
      gameStage:
        matchCount === 9 ? "over" : this.props.gameState.gameStage
    })
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
    this.props.setGameState({
      gameStage: "ready",
      audioUrl: "media/shuffle-tones.mp3"
    })
    .then( () => {
      console.log("game state ready?", this.props.gameState.gameStage);
      setTimeout(() => {
        this.props.setGameState({
          gameStage: "shuffling"
        })
        .then(() => this.props.playAudio())
      }, 800);
      setTimeout(() => this.props.setGameState({ gameStage: "find" }), 2800);
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1 className={`${this.props.gameState.gameStage === "find" ? "move" : ""}`}>{this.props.hints[this.props.gameState.gameStage]}</h1>
        <button
          className={`start-btn ${this.props.gameState.gameStage !== "pregame" ? "isHidden" : ""}`}
          onClick={() => this.initGame()}>START
        </button>
        <div className="board-container">
          <Board
            key={this.props.gameState.gameId}
            tiles={this.props.gameState.tiles}
            imgCount={20}
            media={this.props.media}
            onClick={(i, tileId, audioUrl) => this.handleClick(i, tileId, audioUrl)}
            gameState={this.props.gameState.gameStage}
          />
        </div>
      </React.Fragment>
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
