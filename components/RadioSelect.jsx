import { useState, useEffect } from "react";

/**
 * Radio input group for settings page.
 *
 * @param {Object} props
 * @param {Object} props.options Info for each radio option,
 *      including label and corresponding CSS property change.
 *
 *      Example: {label: "option1", change: "primaryColor", newVal: "#000000"}
 *
 * @param {string} props.label Radio id and label
 *
 * @returns {JSX} React component for radio buttons
 */
function RadioSelect(props) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    getStorage();
  }, []);

  /** Retrieves selected option from local storage. */
  function getStorage() {
    let value = localStorage.getItem(props.label);
    setSelected(value);
  }

  return (
    <>
      <div className="mb-2 flex h-14 w-sm flex-row items-center rounded-lg bg-zinc-800 outline outline-gray-500">
        <span className="ml-2">{props.label}</span>
        {props.options.map((option) => {
          return (
            <RadioInput key={option} option={option} label={props.label} selected={selected} />
          );
        })}
      </div>
    </>
  );
}

/** Individual radio input. */
function RadioInput(props) {
  /** Stores selected option in local storage. */
  function handleSelection(evt) {
    let value = evt.target.id.toLowerCase();
    localStorage.setItem(props.label, value);
  }

  return (
    <>
      <span className="ml-5">
        <input
          type="radio"
          id={props.option}
          name={props.label}
          onChange={handleSelection}
          defaultChecked={props.option.toLowerCase() == props.selected ? true : undefined}
          className="mr-1 size-5"
        />
        <label htmlFor={props.option}>{props.option}</label>
      </span>
    </>
  );
}

export default RadioSelect;
