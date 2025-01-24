import { useEffect, useState, useContext } from "react";
import Accordion from "./../Accordion.jsx";
import TaskMarker from "./TaskMarker.jsx";
import AppContext from "./../../components/AppContext.jsx"

function GroupItem(props) {
    /** Current selected task. @type {text} */
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)
        
    const groupName = props.list[0]
    const [taskData, setTaskData] = useState([])
    const accordionItems = taskData.map((task) => (
        <GroupItemCard
            name={task.name}
            key={"group-item-" + task.name}
        />
    ))

    useEffect(() => {
        setTaskData(props.list[1])
    }, [])

    /** Changes currently selected task, based on the task marker.
     * 
     * @param {boolean} reset Determines if task should be set (true) or unset (false).
     */
    function updateSelectedTask(reset) {
        if (reset) {
            setSelectedTask(null)
        }
        else {
            setSelectedTask("Group " + groupName)
        }
    }

    return(
        <>
            <div>
                <Accordion 
                    title={"Group " + groupName}
                    content={accordionItems}
                    key={"grouped-task-accordion-" + groupName}
                />
                <TaskMarker updateSelectedTask={updateSelectedTask}/>
            </div>
        </>
    )
}

function GroupItemCard(props) {
    return(
        <>
            <div>
                {props.name}
            </div>
        </>
    )
}

export default GroupItem;