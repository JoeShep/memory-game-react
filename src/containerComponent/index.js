import React, { Component } from "react";
import Game from "../gameComponent";
import "./container.css";

class Container extends Component {
  constructor(props) {
    super(props);
    // may need to combine tiles' true/false with matched in single object
    this.state = {
      gameId: 1, //this allows us to create a new game by using it as an ID on a board and then incrementing it by 1 to force React to create a new Board instance
      tiles: Array(20).fill({ flipped: false, matched: false }),
      clickedTiles: [],
      // matched: false,
      matchCount: 0,
      gameStage: "pregame"
    };
  }

  setGameState(statesObj) {
    return new Promise( function(resolve, reject) {
      console.log('setGameState', statesObj );
      this.setState(statesObj);
      resolve(this.state);
    }.bind(this));
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
            <button onClick={() => this.props.onClick()}>Play Again</button>
          </div>
        </div>
        <Game
          media={this.props.media}
          gameState={this.state}
          // need to use fat arrow here instead of ref to method to preserve 'this' context
          setGameState={(stateObj) => this.setGameState(stateObj)}
        />
      </div>
    );
  }
}

// Container.defaultProps = {
//   hints: {
//     pregame: "This is a Game of Memory",
//     ready: "Get Ready!",
//     shuffling: "Shuffling!",
//     find: "Find the famous pairs!",
//     over: "You did it!"
//   }
// };

export default Container;
