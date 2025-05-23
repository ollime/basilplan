/** @file List of all tasks. */
import { useState } from "react";
import { useEffect } from "react";

import { deleteTask, getTasks, sendTask } from "../../src/api/task-api.js";
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
      editTask={editTask}
    />
  ));

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
        newTasks.push(i.task_name);
      }
      return newTasks;
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

  /** Adds a new task and updates task list. */
  function handleAddTask() {
    let text = "new task";
    text = checkExistingTask(text);
    updateTask(text);
    setTasks([...tasks, text]);
  }

  /** Deletes an existing task. */
  async function deleteUpdateTask(taskName) {
    deleteTask(encodeURIComponent(taskName));
    setTasks(tasks.filter((item) => item != taskName));
  }

  /** Modifies an existing task. */
  function editTask(index, taskName) {
    taskName = checkExistingTask(taskName);
    updateTask(taskName);
    tasks[index] = taskName;
    setTasks([...tasks]);
  }

  /** All task names must be unique.
   *
   * If a duplicate task name exists, adds a number to it,
   * beginning with 1 and incrementing with each duplicate name.
   *
   * @param {string} taskName Task name.
   * @returns {string} If the task already exists, adds a number.
   *      Otherwise, return the new task name.
   * @example "taskName" returns "taskName 1"
   */
  function checkExistingTask(taskName) {
    while (tasks.includes(taskName)) {
      let lastChar = taskName.split(" ").slice(-1);
      if (!isNaN(lastChar)) {
        let originalText = taskName.slice(
          0,
          taskName.length - lastChar[0].length
        );
        taskName = originalText + (parseInt(lastChar) + 1);
      } else {
        taskName += " 1";
      }
    }
    return taskName;
  }

  /** Sends the task to the database. */
  function updateTask(taskName) {
    sendTask(encodeURIComponent(taskName), 0, 0);
  }

  return (
    <>
      <div>
        <div id="task" className="flex w-md flex-col">
          <div
            id="task-label"
            className="flex size-10 w-xs items-center justify-center rounded-t-lg bg-zinc-800 text-3xl outline outline-gray-500"
          >
            Task List
          </div>
          {taskList}
          <button
            className="size-10 w-xs rounded-b-lg bg-teal-800 outline outline-gray-500"
            onClick={handleAddTask}
          >
            Add Task +
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskList;
