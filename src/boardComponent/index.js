import React, { Component } from "react";
import Square from "../squareComponent";
import "./board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    // may need to combine tiles' true/false with matched in single object
    this.state = {
      randomized: Array(3).fill(null) //When game starts, show three random tiles as purple for shuffle effect
    };
  }

  // Has access to state and props, runs before the element is mounted to the DOM
  // componentWillMount() {
  //   // Set three random numbers on state to match with index of 3 tiles to turn them purple
  //   let randomized = this.state.randomized.map(num => {
  //     return Math.floor(Math.random() * this.props.imgCount) + 1;
  //   });
  //   this.setState({ randomized });
  // }

  // When the board received updated props (the changed game state), trigger the shuffle animation
  componentWillReceiveProps() {
    // Change the random numbers
    let randomTiles = setInterval(() => {
      let randomized = this.state.randomized.map(num => {
        return Math.floor(Math.random() * this.props.imgCount) + 1;
      });
      this.setState({ randomized });
      // Stop the animation once game is ready to play
      if (this.props.gameState === "find") {
        clearInterval(randomTiles);
        // maybe replace value with a default?
        this.setState({ randomized: Array(3).fill(null) });
      }
    }, 350);
  }

  render() {
    console.log("randomixed", this.state.randomized);

    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      let tileId = this.props.media[i].id;
      // "key" is required when dynamically adding multiple instances so React can keep track
      rows.push(
        <Square
          flipped={this.props.tiles[i].flipped}
          id={tileId + i}
          matched={this.props.tiles[i].matched}
          key={i}
          image={this.props.media[i].imgUrl}
          randomized={this.state.randomized.find(randomNum => i === randomNum)}
          onClick={() => this.props.onClick(i, tileId)}
        />
      );
    }
    return <div className="board">{rows}</div>;
  }
}

export default Board;
