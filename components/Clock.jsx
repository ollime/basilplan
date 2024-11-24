import { useState } from "react";
import { useEffect } from "react";

function Clock() {
    const [timer, setTimer] = useState(false)
    const [seconds, setSeconds] = useState(650)
    
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
                setSeconds(650)
            }
        }
        
        if (timer) {
            startTimer()
        }
        
        return() => {
            stopTimer()
        }
    }, [timer, seconds])

    function handleStartTimer() {
        setTimer(!timer)
    }

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

    return(
        <>
            <div id="clock">
                <div id="timer" className="flex-center">
                    <span id="seconds">{convertToTime(seconds)}</span>
                </div>
                <button id="timer-btn" className="small-btn flex-center"
                    onClick={handleStartTimer}>{timer ? "Pause" : "Start"}</button>
            </div>
        </>
    )
}

export default Clock;