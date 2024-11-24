import { useState } from "react"

function Checkbox(props) {
    return (
        <>
            <div className="align-center">
                <input id={props.label} type="checkbox"/>
                <label htmlFor={props.label}>{props.label}</label>
            </div>
        </>
    )
}

export default Checkbox;