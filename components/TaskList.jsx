import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

function TaskList() {
    const [count, setCount] = useState(0)
    const [tasks, setTasks] = useState([]);
    const taskList = tasks?.map((task, index) => (
        <TaskItem
            count={index}
            text={index + " " + task.text}
            key={task.text + index}
            deleteTask={deleteTask} />
    ))

    function deleteTask(index) {
       setTasks(tasks.filter((item, i) => i != index))
    }

    function addTask() {
        setCount(taskList.length + 1)
        const newTask = {text: "test"}
        setTasks([...tasks, newTask])
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