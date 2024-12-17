import { useState, useEffect, useRef } from "react";

import EditIcon from "./../src/public/icons/edit.svg";
import ConfirmIcon from "./../src/public/icons/check.svg";

function TextField(props) {
    const [editText, setEditText] = useState(false);
    const textInput = useRef(null)

    const [text, setText] = useState()

    useEffect(() => {
        getStorage()
    }, [])

    function getStorage() {
        let value = localStorage.getItem(props.label);
        value = value / 60;
        setText(value);
    }

    /** Sets values to local storage. Converts minutes to seconds. */
    function sendToStorage(value) {
        value = value * 60;
        localStorage.setItem(props.label, value)
    }

    // TODO: autofocus on text input
    function handleOpenEdit() {
        setEditText(!editText)
    }

    function handleConfirm() {
        setText(textInput.current.value)
        sendToStorage(textInput.current.value)
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