import { useState, useContext } from "react";
import AppContext from "./../components/AppContext.jsx"

function TaskMarker(props) {
    // width should be > 50
    const width = 60;
    // keep height as even number
    const height = 46;

    const [index, setIndex] = useState(0)
    const colors = [
        {color: "unset", text: ""},
        {color: "success", text: "current task"},
        {color: "highlight", text: "important"},
        //{color: "danger", text: "test flag"}
    ]

    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)

    function handleChangeMarker() {
        setIndex(index + 1)
        if (index == 0) {
            if (selectedTask != null) {
                setIndex(index + 2);
            }
            else {
                props.updateSelectedTask(false);
            }
        }
        if (index == 1) {
            props.updateSelectedTask(true);
        }
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
            <svg xmlns="http://www.w3.org/2000/svg" className={props.color + " margin"} height="30px" width="30px" viewBox="0 -960 960 960" fill="#e8eaed"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/></svg>
        </>
    )
}

export default TaskMarker;