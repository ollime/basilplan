function Clock() {
    return(
        <>
            <div>
                <div id="clock" className="flex-center"><span id="seconds" data-value="650">10:50</span></div>
                <button id="timer-btn" className="small-btn flex-center">Start</button>
            </div>
        </>
    )
}

export default Clock;