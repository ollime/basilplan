import { useState, useEffect } from "react";

/** Checkbox input component. */
function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getStorage();
  }, []);

  /** Stores the checked state to local storage. */
  function handleUpdateStorage(evt) {
    setIsChecked(evt.target.checked);
    localStorage.setItem(props.label, !isChecked);
  }

  /** Retrieves the checked state from local storage. */
  function getStorage() {
    let storageString = localStorage.getItem(props.label);
    let storageBoolean = storageString === "true";
    setIsChecked(storageBoolean);
  }

  return (
    <>
      <div className="mb-2 flex h-14 w-sm flex-row items-center rounded-lg bg-zinc-800 outline outline-gray-500">
        <input
          id={props.label}
          type="checkbox"
          onChange={handleUpdateStorage}
          checked={isChecked}
          className="mx-2 size-5"
        />
        <label htmlFor={props.label}>{props.label}</label>
      </div>
    </>
  );
}

export default Checkbox;
