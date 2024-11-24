import { useState } from "react";

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

    function handleChangeMarker() {
        setIndex(index + 1)
        if (index == 0) {
            if (props.currentTask) {
                setIndex(index + 2);
            }
            else {
                props.setCurrent();
            }
        }
        if (index == 1) {
            props.setCurrent();
        }
        if (index == colors.length - 1) {
            setIndex(0)
        }
    }
    
    return (
        <>
            <span className="btn-size task-marker align-center">
                <svg width={width} height={height} viewBox={"0 0 " + width + " " + height}>
                <polygon points={`0,0 ${width},0 ${width - 20},${height / 2} ${width},${height} 0,${height}`}
                    className={colors[index].color} onClick={handleChangeMarker}/>
                </svg>
                {/* <span className={`star ${colors[index].color}`} onClick={handleChangeMarker}>★</span> */}
                <span>{colors[index].text}</span>
            </span>
        </>
    )
}

export default TaskMarker;