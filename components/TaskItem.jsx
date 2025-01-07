import { useState, useRef, useContext } from "react";
import TaskMarker from "./TaskMarker.jsx";
import AppContext from "./../components/AppContext.jsx"

import EditIcon from "/icons/edit.svg";
import ConfirmIcon from "/icons/check.svg";
import DeleteIcon from "/icons/delete.svg";
import CancelIcon from "/icons/cancel.svg";

/** One task for the task list.
 * 
 * @param {string} props.text The task name.
 * @param {number} props.count Current position in the list.
 * @param {function} props.editTask Modify an existing task.
 * @param {function} props.deleteTask Delete an existing task.
 * @param {string} props.currentTask
 */
function TaskItem(props) {
    /** Determines if the edit panel is currently open. @type {boolean} */
    const [edit, setEdit] = useState(false);

    /** Task name. Used for updating element. @type {text} */
    const [text, setText] = useState(props.text)

    /** Reference to element containing the task name. Used for sending data. @type {*} */
    const textRef = useRef(null);

    /** Index. Current position in the list. @type {number} */
    const count = props.count;

    /** Current selected task. @type {text} */
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)
    
    /** Opens the edit panel. */
    function handleOpenEdit() {
        setEdit(!edit)
    }

    /** Confirms the task and sends it to the database. */
    function handleConfirmTask() {
        let txt = textRef.current.value;
        if (txt != text) {
            // sends current text to database
            props.editTask(count, txt)
            // updates element
            setText(txt)
        }
        handleOpenEdit();
    }

    /** Deletes the task, including in the database. */
    function handleDeleteTask() {
        let txt = textRef.current.value;
        props.deleteTask(txt)
        handleOpenEdit();
        if (selectedTask == txt) {
            setSelectedTask(null)
        }
    }

    /** Changes currently selected task, based on the task marker.
     * 
     * @param {boolean} reset Determines if task should be set (true) or unset (false).
     */
    function updateSelectedTask(reset) {
        if (reset) {
            setSelectedTask(null)
        }
        else {
            setSelectedTask(text)
        }
    }

    return (
        <>
            <div className="flex-row">
                <span className={"list-item flex-center"}>
                    <div className={`display-panel ${edit ? "hidden" : "flex"}`}>
                        <button className="small-square-btn">{count}</button>
                        <button className="item-label">{text}</button>
                        <button className="edit-btn" onClick={handleOpenEdit}>
                            <img src={EditIcon}></img>
                        </button>
                    </div>

                    <div className={`edit-panel ${edit ? "flex" : "hidden"}`}>
                        <input type="text" id={text + count} className="item-label" defaultValue={text} ref={textRef} />
                        <button className="confirm-btn" onClick={handleConfirmTask}>
                            <img src={ConfirmIcon}></img>
                        </button>
                        <button className="delete-btn" onClick={handleDeleteTask}>
                            <img src={DeleteIcon}></img>
                        </button>
                        <button className="edit-btn" onClick={handleOpenEdit}>
                            <img src={CancelIcon}></img>
                        </button>
                    </div>
                </span>
                <TaskMarker updateSelectedTask={updateSelectedTask}/>
            </div>
        </>
    )
}

export default TaskItem;