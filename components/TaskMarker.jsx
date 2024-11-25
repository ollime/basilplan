import { useState, useContext } from "react";
import AppContext from "./../components/AppContext.jsx"

function TaskMarker(props) {
    /** Task marker width. Should be > 50 @type {number} */
    const width = 60;
    /** Task marker height. Should be an even number @type {number} */
    const height = 46;

    /** Determines the color of the marker. @type {number} */
    const [index, setIndex] = useState(0)
    /** Flag settings. Contains color and text values. @type {Object} */
    const colors = [
        {color: "unset", text: ""},
        {color: "success", text: "current task"},
        {color: "highlight", text: "important"},
        //{color: "danger", text: "test flag"}
    ]

    /** Current selected task. @type {text} */
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)

    /** Updates color and text of the task marker when it is pressed on. */
    function handleChangeMarker() {
        setIndex(index + 1)
        // If there is already a selected task, do not allow a second selected task
        if (index == 0) {
            // Skips color for current task
            if (selectedTask != null) {
                setIndex(index + 2);
            }
            // Sets current task
            else {
                props.updateSelectedTask(false);
            }
        }
        // Removes current task
        if (index == 1) {
            props.updateSelectedTask(true);
        }
        // Cycles through colors. Resets index if it is the last color
        if (index == colors.length - 1) {
            setIndex(0)
        }
    }
    
    return (
        <>
            <span className="btn-size task-marker flex-center" onClick={handleChangeMarker}>
                <FlagMarker width={width} height={height} color={colors[index].color}/>
                {/* <StarMarker color={colors[index].color}/> */}
                <span className="task-marker-label">{colors[index].text}</span>
            </span>
        </>
    )
}

function FlagMarker(props) {
    const width = props.width;
    const height = props.height;
    return(
        <>
            <svg width={width} height="50" viewBox={"0 0 " + width + " 50"}>
                <polygon points={`0,0 ${width},0 ${width - 20},${height / 2} ${width},${height} 0,${height}`}
                    className={props.color}/>
            </svg>
        </>
    )
}

function StarMarker(props) {
    return(
        <>
            <svg xmlns="http://www.w3.org/2000/svg" className={props.color + " margin-left"} height="30px" width="30px" viewBox="0 -960 960 960" fill="#e8eaed"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
        </>
    )
}

export default TaskMarker;