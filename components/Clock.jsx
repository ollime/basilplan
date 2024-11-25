import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext.jsx"
import { sendLogData } from "../src/api/log-api.js"

import StartIcon from "./../src/public/icons/play.svg";
import PauseIcon from "./../src/public/icons/pause.svg";
import ResetIcon from "./../src/public/icons/restart.svg";
import SkipIcon from "./../src/public/icons/skip.svg";

function Clock() {
    const defaultTimerValue = 1;

    /** Determines if the timer is currently running. @type {boolean} */
    const [timer, setTimer] = useState(false)

    /** Current timer value. @type {number} */
    const [seconds, setSeconds] = useState(defaultTimerValue)

    /** Current selected task. @type {text} */
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)

    /** Applies timer interval. Updates timer value. */
    useEffect(() => {
        let timerID;
        
        // TODO: put the default timer value somewhere
        // TODO: Add in automatic or manual start option
        /**
         * Starts the timer and changes the timer button.
         * 
         * Stops when timer value is less than 0.
         */
        function startTimer() {
            if (!timerID) {
                timerID = setInterval(() => {
                    setSeconds(seconds - 1)
                }, 1000)
            }
            if (seconds < 0) {
                stopTimer()
                setTimer(false)
            }
        }

        /** Stops the timer. If automatic breaks, resets to default timer value. */
        function stopTimer() {
            clearInterval(timerID);
            timerID = null;
            // automatically resets timer
            if (seconds < 0) {
                sendLogData(selectedTask, defaultTimerValue / 60)
                setSeconds(defaultTimerValue)
            }
        }
        
        if (timer) {
            startTimer()
        }
        
        return() => {
            stopTimer()
        }
    }, [timer, seconds])

    /**
     * Converts integer to time format m:ss.
     * 
     * @param {number} value - Value
     * @example Converts 120 to 2:00
    */
   function convertToTime(value) {
       let timeValue = parseInt(value)
       let minutes = Math.floor(timeValue / 60)
       let seconds = timeValue - (minutes * 60)
       
       // applies leading zero
       if (seconds < 10) {seconds = "0"+seconds}
       
       return minutes + ":" + seconds;
    }

    /** Starts the timer. */
    function handleStartTimer() {
        setTimer(!timer)
    }

    /** Stops the timer and resets values. */
    function handleRestartTimer() {
        setTimer(false)
        setSeconds(defaultTimerValue)
    }

    /** Stops the timer, resets values, and changes timer type. */
    function handleSkipTimer() {
        // TODO: implement different timer types
        // TODO: implement skip timer
    }

    return(
        <>
            <div id="clock">
                <span>current task: {selectedTask}</span>
                <div id="timer" className="flex-center">
                    <span id="seconds">{convertToTime(seconds)}</span>
                </div>
                <span className="timer-btns">
                    <button className="small-square-btn" onClick={handleRestartTimer}>
                        <img src={ResetIcon}></img>
                    </button>
                    <button className="small-square-btn"
                        onClick={handleStartTimer}>
                            <img src={timer ? PauseIcon : StartIcon}></img>
                    </button>
                    <button className="small-square-btn" onClick={handleSkipTimer}>
                        <img src={SkipIcon}></img>
                    </button>
                </span>
            </div>
        </>
    )
}

export default Clock;