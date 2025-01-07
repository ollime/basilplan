import { useState, useEffect } from "react"

/** Checkbox input component. */
function Checkbox(props) {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        getStorage()
    }, [])

    /** Stores the checked state to local storage. */
    function handleUpdateStorage(evt) {
        setIsChecked(evt.target.checked)
        localStorage.setItem(props.label, !isChecked)
    }

    /** Retrieves the checked state from local storage. */
    function getStorage() {
        let storageString = localStorage.getItem(props.label);
        let storageBoolean = (storageString === "true");
        setIsChecked(storageBoolean)
    }

    return (
        <>
            <div className="align-center">
                <input id={props.label} type="checkbox"
                onChange={handleUpdateStorage} checked={isChecked}/>
                <label htmlFor={props.label}>{props.label}</label>
            </div>
        </>
    )
}

export default Checkbox;