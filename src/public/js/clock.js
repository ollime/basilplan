(function() {
    let timerID;
    let defaultTimerVal = 10;

    let stopBtn = document.getElementById("timer-btn")
    let time = document.getElementById("seconds")

    // TODO: Add in formatting for minutes, hours, etc.
    // TODO: Add in automatic or manual start option
    function startTimer() {
        if (!timerID) {
            timerID = setInterval(startTimer, 1000);
        }
        time.innerHTML--;
        stopBtn.innerHTML = "Pause";
        if (time.innerHTML < 0) {
            stopTimer()
        }
    }

    function stopTimer() {
        clearInterval(timerID);
        timerID = null;
        stopBtn.innerHTML = "Start";

        if (time.innerHTML < 0) {
            time.innerHTML = defaultTimerVal;
        }
    }

    stopBtn.addEventListener("click", function() {
        stopBtn.innerHTML == "Start" ? startTimer() : stopTimer();
    })
})();