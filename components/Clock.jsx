/** @file Timer for the main page. */
import { useContext, useEffect, useState } from "react";

import { sendLogData } from "../src/api/log-api.js";
import AppContext from "./AppContext.jsx";
import PauseIcon from "/icons/pause.svg";
import StartIcon from "/icons/play.svg";
import ResetIcon from "/icons/restart.svg";
import SkipIcon from "/icons/skip.svg";

/** Pomodoro timer. */
function Clock() {
  /** Determines if the timer is currently running. @type {boolean} */
  const [timer, setTimer] = useState(false);

  /** Stores timer types and minutes for each type.
   *
   * Updates minute values based on settings stored in local storage.
   *
   * @type {Object}
   */
  const timerTypes = [
    { type: "Main Timer", value: 1 },
    { type: "Short Break", value: 2 },
    { type: "Main Timer", value: 1 },
    { type: "Short Break", value: 2 },
    { type: "Main Timer", value: 1 },
    { type: "Short Break", value: 2 },
    { type: "Main Timer", value: 1 },
    { type: "Short Break", value: 2 },
    { type: "Long Break", value: 3 },
    { type: "Main Timer", value: 1 }
  ];
  /** Index for timer type. @type {number} */
  const [type, setType] = useState(0);

  /** Determines whether timer automatically runs when reset @type {boolean} */
  let startAutomatically = false;

  /** Updates timer settings from local storage. */
  function getTimerSettings() {
    for (let i in timerTypes) {
      let value = localStorage.getItem(timerTypes[i].type + " (minutes)");
      timerTypes[i].value = value;
    }
    startAutomatically = localStorage.getItem("Automatically start breaks");
  }
  getTimerSettings();

  /** Current timer value. @type {number} */
  const [seconds, setSeconds] = useState(timerTypes[type].value);

  /** Current selected task. @type {text} */
  const { selectedTask } = useContext(AppContext);

  /** Applies timer interval. Updates timer value. */
  useEffect(() => {
    let timerID;
    /**
     * Starts the timer and changes the timer button.
     *
     * Stops when timer value is less than 0.
     */
    function startTimer() {
      if (!timerID) {
        timerID = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);
      }
      if (seconds < 0) {
        stopTimer();
      }
    }

    /** Stops the timer. If automatic breaks, resets to default timer value. */
    function stopTimer() {
      clearInterval(timerID);
      timerID = null;
      // automatically resets timer
      if (seconds < 0) {
        if (type == 0) {
          // send data if timer type is main
          sendLogData(selectedTask, timerTypes[type].value / 60);
        }

        handleSkipTimer();

        // automatic timer start - optional setting
        if (startAutomatically) {
          setTimer(true);
        }
      }
    }

    if (timer) {
      startTimer();
    }

    return () => {
      stopTimer();
    };
  }, [timer, seconds]);

  /**
   * Converts integer to time format m:ss.
   *
   * @param {number} value - Value
   * @example Converts 120 to 2:00
   */
  function convertToTime(value) {
    let timeValue = parseInt(value);
    let minutes = Math.floor(timeValue / 60);
    let seconds = timeValue - minutes * 60;

    // applies leading zero
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  /** Starts the timer. */
  function handleStartTimer() {
    if (selectedTask) {
      setTimer(!timer);
    } else {
      alert("Select a task first");
    }
  }

  /** Stops the timer and resets values. */
  function handleRestartTimer() {
    setTimer(false);
    setSeconds(timerTypes[type].value);
  }

  /** Stops the timer, resets values, and changes timer type. */
  function handleSkipTimer() {
    setTimer(false);
    // updates type. resets to 0 if at last timer type
    if (type == timerTypes.length - 2) {
      setType(0);
    } else {
      setType(type + 1);
    }
    // updates seconds with new type value
    setSeconds(timerTypes[type + 1].value);
  }

  return (
    <>
      <div className="flex w-md flex-col gap-2">
        <div id="clock-info" className="flex flex-row gap-2">
          <span className="text-md flex grow rounded-2xl bg-teal-800 p-2 text-sm outline outline-gray-500">
            Selected Task: {selectedTask}
          </span>
          {/* TODO: change color based on current task */}
          <span className="flex rounded-2xl bg-teal-800 p-2 text-sm outline outline-gray-500">
            {timerTypes[type].type}
          </span>
        </div>
        <div
          id="clock"
          className="rounded-xl shadow-lg outline outline-gray-500"
        >
          <div
            id="timer"
            className="flex-center rounded-t-xl bg-zinc-800 py-25 text-center text-6xl"
          >
            <span id="seconds">{convertToTime(seconds)}</span>
          </div>
          <span className="flex h-auto flex-row rounded-b-xl bg-zinc-500">
            <button
              className="flex size-12 grow-1 items-center justify-center"
              onClick={handleRestartTimer}
            >
              <img src={ResetIcon}></img>
            </button>
            <button
              className="flex size-12 grow-1 items-center justify-center"
              onClick={handleStartTimer}
            >
              <img src={timer ? PauseIcon : StartIcon}></img>
            </button>
            <button
              className="flex size-12 grow-1 items-center justify-center"
              onClick={handleSkipTimer}
            >
              <img src={SkipIcon}></img>
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default Clock;
