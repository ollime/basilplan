import { useState } from "react";
import { useRef } from "react";

import EditIcon from "./../src/public/icons/edit.svg";
import ConfirmIcon from "./../src/public/icons/check.svg";

function TextField(props) {
    const [editText, setEditText] = useState(false);
    const textInput = useRef(null)

    // TODO: update with already set values
    const [text, setText] = useState("25")

    // TODO: autofocus on text input
    function handleOpenEdit() {
        setEditText(!editText)
    }

    function handleConfirm() {
        setText(textInput.current.value)
        handleOpenEdit()
    }

    return (
        <>
            <div>
                <label id={props.label}>{props.label}</label>
                <input id={props.label + "1"} type="text" defaultValue={text}
                disabled={editText ? false : true} ref={textInput}/>
                <button className={`small-square-btn ${editText ? "hidden" : ""}`}
                    onClick={handleOpenEdit}>
                        <img src={EditIcon}></img>
                </button>
                <button className={`small-square-btn ${editText ? "" : "hidden"}`}
                    onClick={handleConfirm}>
                        <img src={ConfirmIcon}></img>
                </button>
            </div>
        </>
    )
}

export default TextField;