/** @file Grouped task display and data formatting. */
import { useEffect, useState } from "react";

import { getTasks } from "../../src/api/task-api.js";
import GroupItem from "./GroupItem.jsx";

/** Grouped task display.
 *
 * Prepares and formats data for displaying grouped tasks. */
function GroupDisplay() {
  const [tasks, setTasks] = useState([]);
  const groupList = tasks.map((task) => (
    <GroupItem list={task} key={"grouped-tasks-" + task[0]} />
  ));

  // TODO: move initial task load for both GroupDisplay and TaskList to App.jsx
  // initial task load
  useEffect(() => {
    let ignore = false;

    /** Unpacks array of task names.
     * @param {object} tasks all task data provided
     * @returns {Array<string>} array of task names
     */
    function formatTasks(tasks) {
      let newTasks = [];
      for (let i of tasks) {
        newTasks.push({
          name: i.task_name,
          column: i.list,
          row: i.position
        });
      }

      // sort by numerical order of position data
      newTasks = newTasks.sort((a, b) => a.position - b.position);
      // removes first column
      newTasks = newTasks.filter((task) => task.column != 0);
      // grouped by list
      const groupedTasks = Object.groupBy(newTasks, ({ column }) => column);
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
          setTasks(formatTasks(response));
        }
      });
    }

    getTaskData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="flex w-md flex-col">
        <span className="flex size-10 w-xs items-center justify-center rounded-t-lg bg-zinc-800 text-3xl outline outline-gray-500">
          Grouped Tasks
        </span>
        {groupList}
      </div>
    </>
  );
}

export default GroupDisplay;
