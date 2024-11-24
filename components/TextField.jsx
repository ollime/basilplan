import { useState } from "react";
import { useRef } from "react";

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
                    onClick={handleOpenEdit}>E</button>
                <button className={`small-square-btn ${editText ? "" : "hidden"}`}
                    onClick={handleConfirm}>C</button>
            </div>
        </>
    )
}

export default TextField;