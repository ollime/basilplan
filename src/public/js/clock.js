(function() {
    let timerID;

    // temporary variable
    let defaultTimerVal = 10;

    let stopBtn = document.getElementById("timer-btn")
    let time = document.getElementById("seconds")


    // TODO: Add in automatic or manual start option
    /**
     * Starts the timer and changes the timer button.
     * 
     * Timer value cannot go below 0.
     */
    function startTimer() {
        if (!timerID) {
            timerID = setInterval(startTimer, 100);
        }
        time.dataset.value--;
        time.innerHTML = convertToTime(time.dataset.value)
        stopBtn.innerHTML = "Pause";
        if (time.dataset.value < 0) {
            stopTimer()
        }
    }

    /**
     * Stops the timer and resets timer button.
     */
    function stopTimer() {
        clearInterval(timerID);
        timerID = null;
        stopBtn.innerHTML = "Start";

        // automatically resets the timer
        if (time.dataset.value < 0) {
            time.dataset.value = defaultTimerVal;
            time.innerHTML = convertToTime(defaultTimerVal)
        }
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

    stopBtn.addEventListener("click", function() {
        stopBtn.innerHTML == "Start" ? startTimer() : stopTimer();
    })
})();