/** @file An item to display a task group. */
import { useContext, useEffect, useState } from "react";

import Accordion from "../Accordion.jsx";
import AppContext from "./../../components/AppContext.jsx";
import TaskMarker from "./TaskMarker.jsx";

/** Displays a column of tasks for the task manager. */
function GroupItem(props) {
  /** Current selected task. @type {text} */
  const { selectedTask, setSelectedTask } = useContext(AppContext);

  /** Label for the column. @type {number} */
  const groupName = props.list[0];

  /** Tasks for the column. @type {Object} */
  const [taskData, setTaskData] = useState([]);
  const accordionItems = taskData.map((task) => (
    <GroupItemCard name={task.name} key={"group-item-" + task.name} />
  ));

  useEffect(() => {
    setTaskData(props.list[1]);
  }, []);

  /** Changes currently selected task, based on the task marker.
   *
   * @param {boolean} reset Determines if task should be set (true) or unset (false).
   */
  function updateSelectedTask(reset) {
    if (reset) {
      setSelectedTask(null);
    } else {
      setSelectedTask("Group " + groupName);
    }
  }

  return (
    <>
      <div className="flex w-xs flex-row outline outline-gray-500">
        <span className="w-xs min-w-xs bg-zinc-800 outline outline-gray-500">
          <Accordion
            title={"Group " + groupName}
            content={accordionItems}
            key={"grouped-task-accordion-" + groupName}
          />
        </span>
        <TaskMarker updateSelectedTask={updateSelectedTask} />
      </div>
    </>
  );
}

/** Displays a card for a grouped task. */
function GroupItemCard(props) {
  return (
    <>
      <div className="m-6">{props.name}</div>
    </>
  );
}

export default GroupItem;
