import { useState, useEffect } from "react";

import Footer from "../../components/Footer.jsx";
import TaskDisplay from "../../components/tasks/TaskDisplay.jsx";
import { getAllTasks } from "../../src/api/task-api.js"

/** Manage tasks. */
function TaskManager() {
  const [columnData, setColumnData] = useState([])
  const taskColumns = columnData.map((col) => (
    <TaskDisplay
      data={col}
      key={col}
    />
  ))

  // Load all task data.
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
                setColumnData([formatTasks(response)])
            }
        })
    }

    getTaskData()

    return() => {
        ignore = true;
    }
  }, [])

  return (
    <>
        {taskColumns}
        <Footer />
    </>
  )
}

export default TaskManager