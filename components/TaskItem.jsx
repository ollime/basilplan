import { useState } from "react";

function TaskItem(props) {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.text)
    const count = props.count;

    function openEdit() {
        setEdit(!edit)
    }

    function editText(text) {
        setText(text)
    }

    function deleteTask() {
        props.deleteTask(count)
        openEdit();
    }

    return (
        <>
            <div className={"list-item flex-center"}>
                <div className={`display-panel ${edit ? "hidden" : "flex"}`}>
                    <span className="item-label">{text}</span>
                    <span className="edit-btn" onClick={openEdit}>E</span>
                </div>

                <div className={`edit-panel ${edit ? "flex" : "hidden"}`}>
                    <input type="text" className="item-label" defaultValue={text}/>
                    <span className="confirm-btn">O</span>
                    <span className="delete-btn" onClick={deleteTask}>X</span>
                    <span className="edit-btn" onClick={openEdit}>C</span>
                </div>
            </div>
        </>
    )
}

export default TaskItem;