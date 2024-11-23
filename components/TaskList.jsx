import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const taskList = tasks?.map((task, index) => (
        <TaskItem
            count={index}
            text={task.text}
            key={task.text + index}
            deleteTask={deleteTask}
            editTask={editTask} />
    ))

    // TODO: initial task load
    // TODO: error in db when index changes after deletion
    function deleteTask(index) {
        fetch(`/api/deleteTask/${index}`)
        .catch((err) => {
            console.log(err)
        })
        setTotalCount(totalCount-1)
        setTasks(tasks.filter((item, i) => i != index))
    }

    function addTask() {
        const newTask = {text: "new task"}
        setTotalCount(totalCount+1)
        updateTask(totalCount, newTask.text)
        setTasks([...tasks, newTask])
    }

    function editTask(index, text) {
        updateTask(index, text)
        tasks[index].text = text;
        setTasks([...tasks])
    }

    function updateTask(index, text) {
        let txt = encodeURIComponent(text)
        fetch(`/api/sendTask/${index}/${txt}`)
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