import React, { Component } from "react";
import ReactDOM from "react-dom";
import Game from "../gameComponent";
// import Audio from 'react-audioplayer';
import Audio from "react-audio-player";
import "./container.css";

class Container extends Component {
  // creating an initial state to save as state makes it easier to start a new game at the end of a game
  static initialState = {
    gameId: 1, //this allows us to create a new game by using it as an ID on a board and then incrementing it by 1 to force React to create a new Board instance
    tiles: Array(20).fill({ flipped: false, matched: false }),
    clickedTiles: [],
    matchCount: 0,
    gameStage: "pregame",
    // playlist: [],
    audioUrl: null
  };

  constructor(props) {
    super(props);
    // may need to combine tiles' true/false with matched in single object
    this.state = Container.initialState;
  }

  playAudio = () => {
    let thing = ReactDOM.findDOMNode(this.audioComponent)
    thing.play();
  }

  setGameState = statesObj => {
    return new Promise(
      function(resolve, reject) {
        console.log("setGameState", statesObj);
        this.setState(statesObj, () => {
          resolve(this.state);
        });
      }.bind(this)
    );
  }

  resetGame() {
    this.setState(Container.initialState, () => {
      this.setState({ gameId: this.state.gameId + 1 });
      console.log("resetting game", this.state.gameId);
    });
  }

  render() {
    return (
      <div className="gameContainer">
        <div
          className={`gameContainer__end ${
            this.state.gameStage === "over" ? "isVisible" : "isHidden"
          }`}
        >
          <div className="gameContainer__end--content">
            <h1>You win!</h1>
            <button onClick={() => this.resetGame()}>Play Again</button>
          </div>
        </div>
        <Game
          media={this.props.media}
          gameState={this.state}
          // need to use fat arrow here instead of ref to method to preserve 'this' context
          setGameState={this.setGameState}
          playAudio={this.playAudio}
        />
        <Audio
          src={this.state.audioUrl}
          preload={"auto"}
          // store a reference of the audio component
          ref={audioComponent => { this.audioComponent = audioComponent; }}
        />
      </div>
    );
  }
}

export default Container;
