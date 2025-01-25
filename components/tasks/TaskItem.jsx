import { useContext, useRef, useState } from "react";

import AppContext from "./../../components/AppContext.jsx";
import TaskMarker from "./TaskMarker.jsx";
import CancelIcon from "/icons/cancel.svg";
import ConfirmIcon from "/icons/check.svg";
import DeleteIcon from "/icons/delete.svg";
import EditIcon from "/icons/edit.svg";

/** One task for the task list.
 *
 * @param {string} props.text The task name.
 * @param {number} props.count Current position in the list.
 * @param {function} props.editTask Modify an existing task.
 * @param {function} props.deleteTask Delete an existing task.
 */
function TaskItem(props) {
  /** Determines if the edit panel is currently open. @type {boolean} */
  const [edit, setEdit] = useState(false);

  /** Task name. Used for updating element. @type {text} */
  const [text, setText] = useState(props.text);

  /** Reference to element containing the task name. Used for sending data. @type {*} */
  const textRef = useRef(null);

  /** Index. Current position in the list. @type {number} */
  const count = props.count;

  /** Current selected task. @type {text} */
  const { selectedTask, setSelectedTask } = useContext(AppContext);

  /** Opens the edit panel. */
  function handleOpenEdit() {
    setEdit(!edit);
  }

  /** Confirms the task and sends it to the database. */
  function handleConfirmTask() {
    let txt = textRef.current.value;
    if (txt != text) {
      // sends current text to database
      props.editTask(count, txt);
      // updates element
      setText(txt);
    }
    handleOpenEdit();
  }

  /** Deletes the task, including in the database. */
  function handleDeleteTask() {
    let txt = textRef.current.value;
    props.deleteTask(txt);
    handleOpenEdit();
    if (selectedTask == txt) {
      setSelectedTask(null);
    }
  }

  /** Changes currently selected task, based on the task marker.
   *
   * @param {boolean} reset Determines if task should be set (true) or unset (false).
   */
  function updateSelectedTask(reset) {
    if (reset) {
      setSelectedTask(null);
    } else {
      setSelectedTask(text);
    }
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <span className="w-xs min-w-xs bg-zinc-800 text-center outline outline-gray-500">
          <div className={`${edit ? "hidden" : "flex"}`}>
            <button className="w-12">{count}</button>
            <button className={`ml-2 grow text-left`}>{text}</button>
            <button
              className="flex size-14 items-center justify-center border-gray-500 bg-zinc-500"
              onClick={handleOpenEdit}
            >
              <img src={EditIcon}></img>
            </button>
          </div>

          <div className={`edit-panel ${edit ? "flex" : "hidden"}`}>
            <input
              type="text"
              id={text + count}
              className="max-w-39 bg-zinc-300 pl-2 text-black"
              defaultValue={text}
              ref={textRef}
            />
            <button
              className="flex size-14 items-center justify-center border-gray-500 bg-teal-600"
              onClick={handleConfirmTask}
            >
              <img src={ConfirmIcon}></img>
            </button>
            <button
              className="flex size-14 items-center justify-center bg-teal-600"
              onClick={handleDeleteTask}
            >
              <img src={DeleteIcon}></img>
            </button>
            <button
              className="flex size-14 items-center justify-center bg-teal-600"
              onClick={handleOpenEdit}
            >
              <img src={CancelIcon}></img>
            </button>
          </div>
        </span>
        <TaskMarker updateSelectedTask={updateSelectedTask} />
      </div>
    </>
  );
}

export default TaskItem;
