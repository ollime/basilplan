import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext.jsx"
import { sendLogData } from "../src/api/log-api.js"

function Clock() {
    const defaultTimerValue = 1;

    const [timer, setTimer] = useState(false)
    const [seconds, setSeconds] = useState(defaultTimerValue)
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)

    useEffect(() => {
        let timerID;
        
        // TODO: put the default timer value somewhere
        // TODO: Add in automatic or manual start option
        /**
         * Starts the timer and changes the timer button.
         * 
         * Stops timer when timer value is less than 0.
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
       
       if (seconds < 10) {seconds = "0"+seconds}
       
       return minutes + ":" + seconds;
    }
    
    function handleStartTimer() {
        setTimer(!timer)
    }

    function handleRestartTimer() {
        setTimer(false)
        setSeconds(defaultTimerValue)
    }

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
                    <button className="small-square-btn"
                        onClick={handleStartTimer}>{timer ? "Pause" : "Start"}</button>
                    <button className="small-square-btn" onClick={handleRestartTimer}>Reset</button>
                    <button className="small-square-btn" onClick={handleSkipTimer}>Skip</button>
                </span>
            </div>
        </>
    )
}

export default Clock;