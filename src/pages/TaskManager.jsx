/** @file Page to manage task grouping. */
import { useEffect, useState } from "react";

import Footer from "../../components/Footer.jsx";
import TaskDisplay from "../../components/tasks/TaskDisplay.jsx";
import { getTasks, sendTask } from "../../src/api/task-api.js";

/** Manages tasks.
 *
 * Main page for the task manager. Loads and reformats all
 * task data for the task displays.
 */
function TaskManager() {
  const [columnData, setColumnData] = useState([]);
  const taskColumns = columnData.map((col) => (
    <TaskDisplay
      data={col[1]}
      label={col[0]}
      key={"task-col-" + col[0]}
      deleteColumn={deleteColumn}
      updateTasks={updateTasks}
    />
  ));

  // Load all task data.
  useEffect(() => {
    let ignore = false;

    /** Unpacks array of task names.
     * @param {JSON} tasks response from database.
     * @returns {Array<Array>} Tasks grouped by columnId listed in database.
     */
    function formatTasks(tasks) {
      // original data formatted as array
      let newTasks = [];
      for (let i of tasks) {
        newTasks.push(i);
      }
      // sort by numerical order of position data
      newTasks = newTasks.sort((a, b) => a.position - b.position);
      // grouped by list
      const groupedTasks = Object.groupBy(newTasks, ({ list }) => list);
      // format as array
      const groupedTaskArray = Object.keys(groupedTasks).map((key) => [
        key,
        groupedTasks[key]
      ]);
      return groupedTaskArray;
    }

    /** Intital task load. Retrieves task data and updates TaskList tasks. */
    async function getTaskData() {
      await getTasks().then((response) => {
        if (!ignore) {
          setColumnData(formatTasks(response));
        }
      });
    }

    getTaskData();

    return () => {
      ignore = true;
    };
  }, []);

  function deleteColumn(column) {
    setColumnData((prevData) =>
      prevData.filter((col) => col != columnData[column])
    );
  }

  function handleAddColumn() {
    const colNum = String(columnData.length);
    const newData = [
      colNum,
      [
        {
          list: colNum,
          position: "-1",
          task_name: "space"
        }
      ]
    ];
    setColumnData((prevData) => [...prevData, newData]);
  }

  function updateTasks(newTasks) {
    // TODO: make this better by only sending tasks that need to be updated
    // i.e. tasks past the new index
    for (let i in newTasks) {
      let task = newTasks[i];
      sendTask(task.name, task.column, i);
    }
  }

  return (
    <>
      <div className="mb-20">
        <div className="my-5 flex flex-row flex-wrap gap-5">{taskColumns}</div>
        <div
          onClick={handleAddColumn}
          className="w-2xs rounded-lg bg-teal-800 p-3 text-center outline outline-gray-500"
        >
          Add new group +
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TaskManager;
