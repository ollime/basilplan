import { useState } from "react";
import { useEffect } from "react";

import { getAllTasks, deleteTask, sendTask } from "./../src/api/task-api.js"
import TaskItem from "./TaskItem.jsx";

function TaskList() {
    const [tasks, setTasks] = useState([]);
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

        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push(i.task_name)
            }
            return newTasks;
        }

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

    function handleAddTask() {
        let text = "new task"
        text = checkExistingTask(text);
        updateTask(text)
        setTasks([...tasks, text])
    }

    async function deleteUpdateTask(text) {
        deleteTask(encodeURIComponent(text))
        setTasks(tasks.filter((item) => item != text))
    }

    function editTask(index, text) {
        text = checkExistingTask(text)
        updateTask(text)
        tasks[index] = text;
        setTasks([...tasks])
    }

    // all task names must be unique
    function checkExistingTask(text) {
        while (tasks.includes(text)) {
            let lastChar = text.split(" ").slice(-1)
            if (!isNaN(lastChar)) {
                let originalText = text.slice(0, text.length - lastChar[0].length)
                text = originalText + (parseInt(lastChar) + 1);
            }
            else {
                text += " 1";
            }
        }
        return text;
    }

    function updateTask(text) {
        sendTask(encodeURIComponent(text))
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