import "./App.css";
import { Component } from "react";

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-arrow-90deg-up"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
    />
  </svg>
);

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-arrow-90deg-down"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z"
    />
  </svg>
);

const repeat = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="bi bi-arrow-repeat"
    viewBox="0 0 16 16"
  >
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
    <path
      fillRule="evenodd"
      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
    />
  </svg>
);

const start = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="bi bi-skip-start-fill"
    viewBox="0 0 16 16"
  >
    <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z" />
  </svg>
);

const stop = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="bi bi-stop-fill"
    viewBox="0 0 16 16"
  >
    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
  </svg>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: "Session",
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      run: false,
    };

    this.reset = this.reset.bind(this);
    this.upLength = this.upLength.bind(this);
    this.downLength = this.downLength.bind(this);
    this.start = this.start.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  formatTime(min, sec) {
    const minLength = String(min).length;
    const secLength = String(sec).length;

    if (minLength === 2 && secLength === 2) {
      return `${min}:${sec}`;
    } else if (minLength === 2 && secLength === 1) {
      return `${min}:${"0" + sec}`;
    } else if (minLength === 1 && secLength === 2) {
      return `${"0" + min}:${sec}`;
    } else if (minLength === 1 && secLength === 1) {
      return `${"0" + min}:${"0" + sec}`;
    }
  }

  upLength(id) {
    const breakLength = this.state.breakLength;
    const sessionLength = this.state.sessionLength;
    const currentState = this.state.currentState;
    const minutes = this.state.minutes;
    const run = this.state.run;

    if (!run) {
      if (id === "break-increment" && breakLength < 60) {
        this.setState((state) => ({
          breakLength: state.breakLength + 1,
        }));
      } else if (id === "session-increment" && sessionLength < 60) {
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
        }));
      }

      if (
        (id === "break-increment" &&
          currentState === "Break" &&
          minutes < 60) ||
        (id === "session-increment" &&
          currentState === "Session" &&
          minutes < 60)
      ) {
        this.setState((state) => ({
          minutes: state.minutes + 1,
        }));
      }
    }
  }

  downLength(id) {
    const breakLength = this.state.breakLength;
    const sessionLength = this.state.sessionLength;
    const currentState = this.state.currentState;
    const minutes = this.state.minutes;
    const run = this.state.run;

    if (!run) {
      if (id === "break-decrement" && breakLength > 1) {
        this.setState((state) => ({
          breakLength: state.breakLength - 1,
        }));
      } else if (id === "session-decrement" && sessionLength > 1) {
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
        }));
      }

      if (
        (id === "break-decrement" && currentState === "Break" && minutes > 1) ||
        (id === "session-decrement" &&
          currentState === "Session" &&
          minutes > 1)
      ) {
        this.setState((state) => ({
          minutes: state.minutes - 1,
        }));
      }
    }
  }

  endTimer() {
    const song = document.getElementById("beep");
    song.play();

    if (this.state.currentState === "Session") {
      this.setState((state) => ({
        minutes: state.sessionLength,
        seconds: 0,
      }));
    } else {
      this.setState((state) => ({
        minutes: state.breakLength,
        seconds: 0,
      }));
    }
  }

  runTimer() {
    const minutes = this.state.minutes;
    const seconds = this.state.seconds;
    const run = this.state.run;

    if (run && seconds > 0) {
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    } else if (run && minutes > 0) {
      this.setState((state) => ({
        minutes: state.minutes - 1,
        seconds: 59,
      }));
    } else {
      if (this.state.currentState === "Session") {
        this.setState(
          (state) => ({
            currentState: "Break",
          }),
          this.endTimer
        );
      } else {
        this.setState(
          (state) => ({
            currentState: "Session",
          }),
          this.endTimer
        );
      }
    }
  }

  start() {
    const run = this.state.run;

    if (!run) {
      this.setState(
        (state) => ({
          run: true,
        }),
        () => {
          this.intervalId = setInterval(this.runTimer, 1000);
        }
      );
    } else {
      this.setState((state) => ({
        run: false,
      }));
      clearInterval(this.intervalId);
    }
  }

  reset() {
    const song = document.getElementById("beep");
    song.pause();
    song.currentTime = 0;

    this.setState(
      (state) => ({
        currentState: "Session",
        breakLength: 5,
        sessionLength: 25,
        minutes: 25,
        seconds: 0,
        run: false,
      }),
      clearInterval(this.intervalId)
    );
  }

  render() {
    const currentState = this.state.currentState;
    const breakLength = this.state.breakLength;
    const sessionLength = this.state.sessionLength;
    const run = this.state.run;
    const timer = this.formatTime(this.state.minutes, this.state.seconds);

    return (
      <div className="App">
        <div id="break-container">
          <span className="label" id="break-label">
            Break Length
          </span>
          <button
            onClick={(e) => this.upLength("break-increment")}
            className="button"
            id="break-increment"
          >
            {arrowUp}
          </button>
          <button
            onClick={(e) => this.downLength("break-decrement")}
            className="button"
            id="break-decrement"
          >
            {arrowDown}
          </button>
          <span className="length" id="break-length">
            {breakLength}
          </span>
        </div>

        <div id="session-container">
          <span className="label" id="session-label">
            Session Length
          </span>
          <button
            onClick={(e) => this.upLength("session-increment")}
            className="button"
            id="session-increment"
          >
            {arrowUp}
          </button>
          <button
            onClick={(e) => this.downLength("session-decrement")}
            className="button"
            id="session-decrement"
          >
            {arrowDown}
          </button>
          <span className="length" id="session-length">
            {sessionLength}
          </span>
        </div>

        <div id="timer-container">
          <div className="timer-box">
            <span id="timer-label">{currentState}</span>
            <span id="time-left">{timer}</span>
          </div>
          <button onClick={this.start} className="button" id="start_stop">
            {!run ? start : stop}
          </button>
          <button onClick={this.reset} className="button" id="reset">
            {repeat}
          </button>
          <audio
            id="beep"
            src="https://freesound.org/data/previews/583/583743_9497060-lq.mp3"
          ></audio>
        </div>
      </div>
    );
  }
}

export default App;
