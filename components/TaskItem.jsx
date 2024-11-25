import { useState, useRef, useContext } from "react";
import TaskMarker from "./TaskMarker.jsx";
import AppContext from "./../components/AppContext.jsx"

import EditIcon from "./../src/public/icons/edit.svg";
import ConfirmIcon from "./../src/public/icons/check.svg";
import DeleteIcon from "./../src/public/icons/delete.svg";
import CancelIcon from "./../src/public/icons/cancel.svg";

function TaskItem(props) {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.text)
    const count = props.count;
    const textRef = useRef(null);
    const {
        selectedTask,
        setSelectedTask
    } = useContext(AppContext)
    
    function openEdit() {
        setEdit(!edit)
    }

    function confirmTask() {
        let txt = textRef.current.value;
        if (txt != text) {
            props.editTask(count, txt)
            setText(txt)    
        }
        openEdit();
    }

    function deleteTask() {
        let txt = textRef.current.value;
        props.deleteTask(txt)
        openEdit();
    }

    function updateSelectedTask(reset) {
        if (!reset) {
            setSelectedTask(text)
        }
        else {
            setSelectedTask(null)
        }
    }

    return (
        <>
            <div className="flex-row">
                <span className={"list-item flex-center"}>
                    <div className={`display-panel ${edit ? "hidden" : "flex"}`}>
                        <button className="small-square-btn">{count}</button>
                        <button className="item-label">{text}</button>
                        <button className="edit-btn" onClick={openEdit}>
                            <img src={EditIcon}></img>
                        </button>
                    </div>

                    <div className={`edit-panel ${edit ? "flex" : "hidden"}`}>
                        <input type="text" id={text + count} className="item-label" defaultValue={text} ref={textRef} />
                        <button className="confirm-btn" onClick={confirmTask}>
                            <img src={ConfirmIcon}></img>
                        </button>
                        <button className="delete-btn" onClick={deleteTask}>
                            <img src={DeleteIcon}></img>
                        </button>
                        <button className="edit-btn" onClick={openEdit}>
                            <img src={CancelIcon}></img>
                        </button>
                    </div>
                </span>
                <TaskMarker currentTask={props.currentTask} updateSelectedTask={updateSelectedTask}/>
            </div>
        </>
    )
}

export default TaskItem;