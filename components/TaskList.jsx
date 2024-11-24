import { useState } from "react";
import { useEffect } from "react";
import TaskItem from "./TaskItem.jsx";

// TODO: new update task function (bug)
// TODO: move api calls to another file

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const taskList = tasks.map((task, index) => (
        <TaskItem
            count={index}
            text={task}
            key={task + index}
            deleteTask={deleteTask}
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

        fetch(`/api/getAllTasks`)
        .then((response) => {
            return response.text()
        })
        .then((text) => {
            if (!ignore) {
                let tasks = JSON.parse(text)
                setTasks(formatTasks(tasks))
            }
        })
        .catch((err) => {
            console.log(err)
        })

        return() => {
            ignore = true;
        }
    }, [])

    function deleteTask(text) {
        let txt = encodeURIComponent(text)
        fetch(`/api/deleteTask/${txt}`)
        .catch((err) => {
            console.log(err)
        })
        setTasks(tasks.filter((item) => item != text))
    }

    // TODO: make this more efficient by updating text variable based on existing new tasks
    function addNewTask() {
        let text = "new task"
        text = checkExistingTask(text);
        updateTask(text)
        setTasks([...tasks, text])
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
        let txt = encodeURIComponent(text)
        fetch(`/api/sendTask/${txt}`)
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div>
                <div id="task">
                    <div id="task-label" className="label">List</div>
                    {taskList}
                </div>
                <button className="add-btn list-item" onClick={addNewTask}>+</button>
            </div>
        </>
    )
}

export default TaskList;