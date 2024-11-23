import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [totalCount, setTotalCount] = useState(0)
    const taskList = tasks.map((task, index) => (
        <TaskItem
            count={index}
            text={task}
            key={task + index}
            deleteTask={deleteTask}
            editTask={editTask} />
    ))

    // TODO: initial task load
    function deleteTask(text) {
        let txt = encodeURIComponent(text)
        fetch(`/api/deleteTask/${txt}`)
        .catch((err) => {
            console.log(err)
        })
        setTasks(tasks.filter((item) => item != text))
    }

    function addTask() {
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
            let lastChar = parseInt(text.slice(-1))
            if (!isNaN(lastChar)) {
                text = text.slice(0, -1) + (lastChar + 1);
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
                <button className="add-btn list-item" onClick={addTask}>+</button>
            </div>
        </>
    )
}

export default TaskList;