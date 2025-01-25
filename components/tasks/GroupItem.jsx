import { useEffect, useState, useContext } from "react";
import Accordion from "../Accordion.jsx";
import TaskMarker from "./TaskMarker.jsx";
import AppContext from "./../../components/AppContext.jsx";

function GroupItem(props) {
  /** Current selected task. @type {text} */
  const { selectedTask, setSelectedTask } = useContext(AppContext);

  const groupName = props.list[0];
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

function GroupItemCard(props) {
  return (
    <>
      <div className="m-6">{props.name}</div>
    </>
  );
}

export default GroupItem;
