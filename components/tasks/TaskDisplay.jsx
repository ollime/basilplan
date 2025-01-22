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
                    label={task.name}
                    columnId={props.label}
                    key={task.name + index}
                />
            }
            key={task + index}
        />
    ))

    useEffect(() => {
        let ignore = false;

        /** Unpacks array of task names.
         * @param {object} tasks all task data provided
         * @returns {Array<string>} array of task names and corresponding column
         * @example Returns [["taskName", "1"], ["taskName 1", "2"]]
         */
        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push({
                    name: i.task_name,
                    column: props.label,
                })
            }
            return newTasks;
        }
        setTasks(formatTasks(props.data))

        return() => {
            ignore = true;
        }

    }, [])

    
    /** Moving a card to the same column. */
    const handleReorder = useCallback(({ currentIndex, newIndex }) => {
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
            currentIndex,
            newIndex,
            destinationColumn,
            currentTask,
        }) => {
            // filter out removed task
            setTasks(tasks.filter((task) => task.name != currentTask))

            // set tasks in new column
            setTasks((prevTasks) => prevTasks.map(item => {
                if (item.column == destinationColumn) {
                    const newTasks = [...tasks, {name: currentTask, column: newIndex}]
                    setTasks(newTasks)
                }
                return item;
            }))
        },
    [tasks]);

    /** Callback function when a task is dropped on the list. */
    const handleDrop = useCallback(({ source, location }) => {
        // checks if new location is a valid drop target
        const destination = location.current.dropTargets[0];
        if (!destination) {
            return;
        }

        // get column ids to compare
        const originalId = source.data.column;
        const destinationId = destination.data.column;

        // finds the current task location
        const currentTask = source.data.taskName;
        const currentIndex = tasks.findIndex((task) => task.name == currentTask)
        let newIndex;

        if (destination.element.innerHTML) {
            // finds the new location to drop the task
            const newTask = destination.element.innerHTML
            newIndex = tasks.findIndex((task) => task.name == newTask)
        } 
        else {
            // if empty task, adds to end of the list
            newIndex = tasks.length;
        }
        
        if (originalId == destinationId) {
            handleReorder({
                currentIndex: currentIndex,
                newIndex: newIndex,
            })
        }
        else {
            handleMove({
                currentIndex: currentIndex,
                newIndex: newIndex,
                destinationColumn: destinationId,
                currentTask: currentTask,
            })
        }

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
                                columnId={props.label}
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