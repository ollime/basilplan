import {useState, useEffect, useCallback} from "react";

import DropLocation from "./DropLocation.jsx"
import TaskCard from "./TaskCard.jsx"

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';

/** A column of task cards.
 * 
 * Uses DropLocation to create drop targets for cards to move
 * between and within columns.
 * 
 * @param  */
function TaskDisplay(props) {
    /** List of task labels. @type {Array<string>} */
    const [tasks, setTasks] = useState([]);
    const taskList = tasks.map((task, index) => (
        <DropLocation 
            child={
                <TaskCard
                    label={task}
                    columnId={props.label}
                    key={task + index}
                />
            }
            key={task + index}
        />
    ))

    useEffect(() => {
        let ignore = false;

        /** Unpacks array of task names.
         * @param {object} tasks all task data provided
         * @returns {Array<string>} array of task names
         */
        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push(i.task_name)
            }
            return newTasks;
        }

        setTasks(formatTasks(props.data))

        return() => {
            ignore = true;
        }

    }, [])

    
    /** Moving a card to the same column. */
    const handleReorder = useCallback(({ source, location, destination }) => {
        // finds the current task location
        const currentTask = source.data.taskName;
        const currentIndex = tasks.findIndex((task) => task == currentTask)
        let newIndex;

        if (destination.element.innerHTML) {
            // finds the new location to drop the task
            const newTask = destination.element.innerHTML
            newIndex = tasks.findIndex((task) => task == newTask)
        } 
        else {
            // if empty task, adds to end of the list
            newIndex = tasks.length;
        }

        /* account for the fact that the current task
        is a part of the list - index should change based
        on whether it is above or below the new task */
        const positionModifier = newIndex < currentIndex ? 0 : -1

        // reorder the tasks
        setTasks(reorder({
            list: tasks,
            startIndex: currentIndex,
            finishIndex: newIndex + positionModifier,
        }))
    }, [tasks])
    

    /** Moving a card to a different column. */
    const handleMove = useCallback(
        ({
            originalIndex,
            sourceColumnId,
            destinationColumnId,
            newIndex,
        }) => {
            const sourceColumnData = columnsData[sourceColumnId]
            const destinationColumnData = columnsData[destinationColumnId];
            const cardToMove = sourceColumnData.cards[originalIndex]
            
            const newSourceColumnData = {
                ...sourceColumnData,
                cards: sourceColumnData.cards.filter(
                    (card) => card.id !== cardToMove.id
                ),
            };
            console.log("DSJFLSDJFKLDSF")
            console.log(cardToMove)
            console.log(newSourceColumnData)
        },
    [tasks]);

    /** Callback function when a task is dropped on the list. */
    const handleDrop = useCallback(({ source, location }) => {
        // checks if new location is a valid drop target
        const destination = location.current.dropTargets[0];
        if (!destination) {
            return;
        }

        console.log(props.label)
        const destinationId = destination.data.columnId;

        console.log(destinationId)

        handleReorder({
            source: source,
            location: location,
            destination: destination,
        })

    }, [tasks, handleReorder, handleMove])
    
    useEffect(() => {
        return monitorForElements({
            onDrop: handleDrop,
        })
    }, [tasks, handleDrop])
    
    return(
        <>
            <div>
                <div id="task">
                    <div id="task-label" className="label">
                        {props.label == "0" ? "Ungrouped Tasks" : "Group " + props.label}
                    </div>
                    {taskList}
                    <DropLocation
                        child={
                            <TaskCard
                                label={""}
                                index={taskList.length}
                                key={"taskListEndCard" + taskList.length}
                            />
                        }
                        key={"taskListEnd" + taskList.length}
                    />
                </div>
            </div>
        </>
    )
}

export default TaskDisplay;