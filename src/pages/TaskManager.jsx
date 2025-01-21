import { useState, useEffect } from "react";

import Footer from "../../components/Footer.jsx";
import TaskDisplay from "../../components/tasks/TaskDisplay.jsx";
import { getTaskNames } from "../../src/api/task-api.js"

/** Manages tasks.
 * 
 * Main page for the task manager. Loads and reformats all
 * task data for the task displays.
 */
function TaskManager() {
  const [columnData, setColumnData] = useState([])
  const taskColumns = columnData.map((col, i) => (
    <TaskDisplay
      data={col[1]}
      label={col[0]}
      key={"task-col-" + i}
    />
  ))

  // Load all task data.
  useEffect(() => {
    let ignore = false;

    /** Unpacks array of task names.
     * @param {JSON} tasks response from database.
     * @returns {Array<Array>} Tasks grouped by columnId listed in database.
     */
    function formatTasks(tasks) {
        let newTasks = [];
        for (let i of tasks) {
          newTasks.push(i)
        }
        // grouped by list
        let groupedTasks = Object.groupBy(newTasks, ({list}) => list)
        // format as array
        let groupedTaskArray = Object.keys(groupedTasks).map((key) => [key, groupedTasks[key]])

        // TODO: reorganize by rowId
        return groupedTaskArray;
    }

    /** Intital task load. Retrieves task data and updates TaskList tasks. */
    async function getTaskData() {
        await getTaskNames()
        .then((response) => {
            if (!ignore) {
                setColumnData(formatTasks(response))
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