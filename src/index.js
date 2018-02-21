import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Just an experiment. Not necessarily for the game. But might be a cool option
// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       timer: this.props.startTime
//     };
//   }
//   componentDidMount() {
//     console.log("didMount");

//     let currentCounter;
//     this.timerCountdown = setInterval(() => {
//       currentCounter = this.state.timer;
//       if (currentCounter === 1) {
//         console.log("This is the end", currentCounter);
//         clearInterval(this.timerCountdown);
//       }
//       console.log("currentCounter", currentCounter);

//       this.setState({ timer: currentCounter - 1 });
//     }, 1000);
//   }
//   render() {
//     return <h2>{this.state.timer}</h2>;
//   }
// }

class Square extends Component {
  render() {
    return (
      <div className={`flipcard h ${this.props.className ? "flipped" : ""}`}>
        <button className="front" onClick={() => this.props.onClick()}>
          {this.props.squareChar}
          This is the front side
        </button>
        <button className="back" onClick={() => this.props.onClick()}>
          {this.props.squareChar}
          This is the back side
        </button>
      </div>
    );
  }
}

class Board extends Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.imgCount; i++) {
      // "key" is required when dynamically adding multiple instances
      rows.push(
        <Square
          className={this.props.tiles[i]}
          key={i}
          squareChar={i + 1}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    return <div className="board">{rows}</div>;
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(20).fill(false)
    };
  }

  handleClick(tileIndex) {
    console.log("clicked a square", tileIndex);
    let clickCount = this.state.tiles.slice();
    if (
      clickCount.filter(clicked => clicked).length < 2 ||
      clickCount[tileIndex] //Is the tile already clicked?
    ) {
      // set the clicked tile's value in tiles array to T/F
      clickCount[tileIndex] = !clickCount[tileIndex];
      this.setState({ tiles: clickCount });
    }
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
          onClick={i => this.handleClick(i)}
        />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
