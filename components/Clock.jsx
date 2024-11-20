function Clock() {
    return(
        <>
            <div class="container">
                <div id="clock" class="flex-center"><span id="seconds" data-value="650">10:50</span></div>
                <button id="timer-btn" class="small-btn flex-center">Start</button>
            </div>
        </>
    )
}

export default Clock;