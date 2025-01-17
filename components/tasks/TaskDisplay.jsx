import {useState, useEffect, useCallback} from "react";

import DropLocation from "./DropLocation.jsx"
import TaskCard from "./TaskCard.jsx"

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';

function TaskDisplay(props) {
    /** List of task labels. @type {Array<string>} */
    const [tasks, setTasks] = useState([]);
    const taskList = tasks.map((task, index) => (
        <DropLocation 
            child={
                <TaskCard
                    label={task}
                    index={index}
                    key={task + index}
                />
            }
            key={task + index}
        />
    ))

    useEffect(() => {
        let ignore = false; 

        setTasks(props.data)

        return() => {
            ignore = true;
        }

    }, [])

    // useEffect(() => {
    //     let ignore = false;

    //     /** Unpacks array of task names. */
    //     function formatTasks(tasks) {
    //         let newTasks = []
    //         for (let i of tasks) {
    //             newTasks.push(i.task_name)
    //         }
    //         return newTasks;
    //     }

    //     /** Intital task load. Retrieves task data and updates TaskList tasks. */
    //     async function getTaskData() {
    //         await getAllTasks()
    //         .then((response) => {
    //             if (!ignore) {
    //                 setTasks(formatTasks(response))
    //             }
    //         })
    //     }

    //     getTaskData()

    //     return() => {
    //         ignore = true;
    //     }
    // }, [])

    /** Callback function when a task is dropped on the list. */
    const handleDrop = useCallback(({ source, location }) => {
        // checks if new location is a valid drop target
        const destination = location.current.dropTargets[0];
        if (!destination) {
            return;
        }

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

    useEffect(() => {
        return monitorForElements({
                onDrop: handleDrop,
        })
    }, [handleDrop, tasks])

    return(
        <>
            <div>
                <div id="task">
                    <div id="task-label" className="label">Task</div>
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