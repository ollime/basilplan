/**
 * Radio input and label for settings page.
 * 
 * @param {Object} props
 * @param {Object} props.options Info for each radio option,
 *      including label and corresponding CSS property change.
 * 
 *      Example: {label: "option1", change: "primaryColor", newVal: "#000000"}
 * 
 * @param {string} props.label Radio id and label
 * 
 * @returns React component for radio buttons
 */

function RadioSelect(props) {
    return (
        <>
            <div>
                <span className="settings-label">{props.label}</span>
                {props.options.map((option) => {
                    return <RadioInput key={option} option={option} label={props.label}/>
                })}
            </div>
        </>
    )
}

function RadioInput(props) {
    return ( 
        <>
            <span className="margin-left">
                <input type="radio" id={props.option} name={props.label} />
                <label htmlFor={props.option}>{props.option}</label>
            </span>
        </>

    )
}

export default RadioSelect;