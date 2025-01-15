import { useState } from "react";
import { useEffect } from "react";

import { getAllTasks, deleteTask, sendTask } from "./../src/api/task-api.js"
import TaskItem from "./TaskItem.jsx";

/** List of all tasks. */
function TaskList() {
    /** List of task labels. @type {Array<string>} */
    const [tasks, setTasks] = useState([]);
    /** List of task JSX. @type {JSX} */
    const taskList = tasks.map((task, index) => (
        <TaskItem
            count={index}
            text={task}
            key={task + index}
            deleteTask={deleteUpdateTask}
            editTask={editTask} />
    ))

    // initial task load
    useEffect(() => {
        let ignore = false;

        /** Unpacks array of task names. */
        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push(i.task_name)
            }
            return newTasks;
        }

        /** Intital task load. Retrieves task data and updates TaskList tasks. */
        async function getTaskData() {
            await getAllTasks()
            .then((response) => {
                if (!ignore) {
                    setTasks(formatTasks(response))
                }
            })
        }

        getTaskData();

        return() => {
            ignore = true;
        }
    }, [])

    /** Adds a new task and updates task list. */
    function handleAddTask() {
        let text = "new task"
        text = checkExistingTask(text);
        updateTask(text)
        setTasks([...tasks, text])
    }

    /** Deletes an existing task. */
    async function deleteUpdateTask(taskName) {
        deleteTask(encodeURIComponent(taskName))
        setTasks(tasks.filter((item) => item != taskName))
    }

    /** Modifies an existing task. */
    function editTask(index, taskName) {
        taskName = checkExistingTask(taskName)
        updateTask(taskName)
        tasks[index] = taskName;
        setTasks([...tasks])
    }

    /** All task names must be unique.
     * 
     * If a duplicate task name exists, adds a number to it,
     * beginning with 1 and incrementing with each duplicate name.
     * 
     * @param {string} taskName Task name.
     */
    function checkExistingTask(taskName) {
        while (tasks.includes(taskName)) {
            let lastChar = taskName.split(" ").slice(-1)
            if (!isNaN(lastChar)) {
                let originalText = taskName.slice(0, taskName.length - lastChar[0].length)
                taskName = originalText + (parseInt(lastChar) + 1);
            }
            else {
                taskName += " 1";
            }
        }
        return taskName;
    }

    /** Sends the task to the database. */
    function updateTask(taskName) {
        sendTask(encodeURIComponent(taskName))
    }

    return (
        <>
            <div>
                <div id="task">
                    <div id="task-label" className="label">Task List</div>
                    {taskList}
                    <button className="add-btn list-item" onClick={handleAddTask}>+</button>
                </div>
            </div>
        </>
    )
}

export default TaskList;