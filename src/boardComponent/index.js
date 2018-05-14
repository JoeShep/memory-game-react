import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import Square from "../squareComponent";
import "./board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    // may need to combine tiles' true/false with matched in single object
    this.state = {
      randomized: Array(3).fill(null), //When game starts, show three random tiles as purple for shuffle effect
      media: shuffle(this.props.media)
    };
  }

  // When the board received updated props (the changed game state), trigger the shuffle animation
  componentWillReceiveProps() {
    console.log("receiving props");

    // Change the random numbers
    if (this.props.gameState === "ready") {
      let randomTiles = setInterval(() => {
        this.setRandomizedState();
        // Stop the animation once game is ready to play
        if (this.props.gameState === "find") {
          console.log("state is find");
          clearInterval(randomTiles);
          // maybe replace value with a default?
          this.setState({ randomized: Array(3).fill(null) });
        }
      }, 200);
    }
  }

  setRandomizedState() {
    let randomized = this.state.randomized.map(num => {
      return Math.floor(Math.random() * this.props.imgCount) + 1;
    });
    this.setState({ randomized });
  }

  componentWillUnmount() {
    clearInterval(this.randomTiles);
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      let tileId = this.state.media[i].id;

      // "key" is required when dynamically adding multiple instances so React can keep track
      rows.push(
        <Square
          flipped={this.props.tiles[i].flipped}
          id={tileId + i}
          matched={this.props.tiles[i].matched}
          key={this.state.media[i].imgUrl}
          image={this.state.media[i].imgUrl}
          randomized={this.state.randomized.find(randomNum => i === randomNum)}
          onClick={() => this.props.onClick(i, tileId)}
          gameState={this.props.gameState}
        />
      );
    }
    return <div className="board">{rows}</div>;
  }
}

export default Board;
