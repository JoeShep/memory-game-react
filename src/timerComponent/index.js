import React, { Component } from 'react';

// firebase stuff, here for now



// Just an experiment. Not necessarily for the game. But might be a cool option
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.startTime
    };
  }
  componentDidMount() {
    console.log("didMount");

    let currentCounter;
    this.timerCountdown = setInterval(() => {
      currentCounter = this.state.timer;
      if (currentCounter === 1) {
        console.log("This is the end", currentCounter);
        clearInterval(this.timerCountdown);
      }
      console.log("currentCounter", currentCounter);

      this.setState({ timer: currentCounter - 1 });
    }, 1000);
  }
  render() {
    return <h2>{this.state.timer}</h2>;
  }
}

export default Timer;
