import { useState, useEffect, useCallback } from "react";

import DropLocation from "./DropLocation.jsx";
import TaskCard from "./TaskCard.jsx";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { sendTask } from "../../src/api/task-api.js";

/** A column of task cards.
 *
 * Uses DropLocation to create drop targets for cards to move
 * between and within columns. */
function TaskDisplay(props) {
  /** List of task labels. @type {Array<string>} */
  const [tasks, setTasks] = useState([]);
  const taskList = tasks.map((task, index) => (
    <DropLocation
      child={<TaskCard label={task.name} columnId={props.label} key={task.name + index} />}
      key={task + index}
    />
  ));

  useEffect(() => {
    let ignore = false;

    /** Unpacks array of task names.
     * @param {object} tasks all task data provided
     * @returns {Array<string>} array of task names and corresponding column
     * @example Returns [["taskName", "1"], ["taskName 1", "2"]]
     */
    function formatTasks(tasks) {
      let newTasks = [];
      for (let i of tasks) {
        newTasks.push({
          name: i.task_name,
          column: props.label
        });
      }
      return newTasks;
    }
    setTasks(formatTasks(props.data));

    return () => {
      ignore = true;
    };
  }, []);

  /** Moves a card to the same column.
   *
   * @param {string} currentIndex index of current task being dragged
   * @param {string} newIndex index to place the current task
   */
  const handleReorder = useCallback(
    ({ currentIndex, newIndex }) => {
      /* account for the fact that the current task
        is a part of the list - index should change based
        on whether it is above or below the new task */
      const positionModifier = newIndex < currentIndex ? 0 : -1;
      const newTasks = reorder({
        list: tasks,
        startIndex: currentIndex,
        finishIndex: newIndex + positionModifier
      });

      // reorder the tasks
      setTasks(newTasks);
      // TODO: make this run only once on the current task list
      props.updateTasks(newTasks);
    },
    [tasks]
  );

  /** If any columns are empty, remove them and update indexes of other columns. */
  const checkColumns = useCallback(({ updatedTasks, column }) => {
    // removes empty column
    if (updatedTasks.length == 0) {
      // ensures the first column is never deleted
      //if (column != 0) {
      //}
      // deletes column
      props.deleteColumn(column);
    }
  }, []);

  /** Moves a card to a different column.
   *
   * @param {string} currentIndex index of the current task
   * @param {string} destinationColumn new column to place the current task
   * @param {string} newIndex new index to place the current task
   * @param {string} currentTask the label/task name of the current task being dragged
   */
  const handleMove = useCallback(
    ({ currentColumn, destinationColumn, newIndex, currentTask }) => {
      const filteredList = tasks.filter((task) => task.name != currentTask);
      // filter out removed task
      setTasks(filteredList);

      /* set tasks in new column
            remember that the argument contains a map, so it runs multiple times,
            for each of the groups available */
      setTasks((prevTasks) =>
        prevTasks.map((item, index) => {
          if (item.column == destinationColumn) {
            // add new task
            let newTasks = [...tasks, { name: currentTask, column: destinationColumn }];
            // Reorder tasks in new column if newIndex is provided
            if (newIndex >= 0) {
              newTasks = reorder({
                list: newTasks,
                startIndex: newTasks.length - 1,
                finishIndex: newIndex
              });
            }
            // update task
            setTasks(newTasks);
            // run api call once
            if (index == 0) {
              props.updateTasks(newTasks);
            }
          }
          return item;
        })
      );

      // if removing the task makes an empty column, remove that column
      checkColumns({
        updatedTasks: filteredList,
        column: currentColumn
      });
    },
    [tasks, checkColumns]
  );

  /** Callback function when a task is dropped on the list. */
  const handleDrop = useCallback(
    ({ source, location }) => {
      // checks if new location is a valid drop target
      const destination = location.current.dropTargets[0];
      if (!destination) {
        return;
      }

      // get column ids to compare
      const originalId = source.data.column;
      const destinationId = destination.data.column;

      // finds the current task location
      const currentTask = source.data.taskName;
      const currentIndex = tasks.findIndex((task) => task.name == currentTask);
      let newIndex;

      if (destination.element) {
        // finds the new location to drop the task
        const newTask = destination.element.innerHTML;
        newIndex = tasks.findIndex((task) => task.name == newTask);
      } else {
        // if empty task, adds to end of the list
        newIndex = tasks.length;
      }

      /* Either reorder within the current column or move to another
        column depending on if the original and destination groups match. */
      if (originalId == destinationId) {
        handleReorder({
          currentIndex: currentIndex,
          newIndex: newIndex
        });
      } else {
        handleMove({
          currentColumn: originalId,
          newIndex: newIndex,
          destinationColumn: destinationId,
          currentTask: currentTask
        });
      }
    },
    [tasks, handleReorder, handleMove]
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop
    });
  }, [tasks, handleDrop]);

  return (
    <>
      <div className="min-w-50 grow rounded-lg bg-zinc-800 text-center outline outline-gray-500">
        <div id={`task-label-${props.label}`} className="border-b border-gray-500 py-2 text-lg">
          {props.label == "0" ? "Ungrouped Tasks" : "Group " + props.label}
        </div>
        {taskList}
        <DropLocation
          child={
            <TaskCard
              label={""}
              index={taskList.length}
              columnId={props.label}
              key={"taskListEndCard" + taskList.length}
            />
          }
          key={"taskListEnd" + taskList.length}
        />
      </div>
    </>
  );
}

export default TaskDisplay;
