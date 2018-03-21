import React, { Component } from "react";
// import "./endGame.css";

class EndGame extends Component {
  render() {
    return (
      <div className="endGameContainer">
        <h1>You win!</h1>
        <button onClick={()=>this.props.onClick()}>Play Again</button>
      </div>
    );
  }
}

export default EndGame;
