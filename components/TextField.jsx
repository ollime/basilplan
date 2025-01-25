import { useEffect, useRef, useState } from "react";

import ConfirmIcon from "/icons/check.svg";
import EditIcon from "/icons/edit.svg";

/** Text input on the settings page.
 *
 * @param {string} props.label
 */
function TextField(props) {
  const [editText, setEditText] = useState(false);
  const textInput = useRef(null);
  const [text, setText] = useState();

  useEffect(() => {
    getStorage();
  }, []);

  useEffect(() => {
    let textLength = textInput.current.value.length;
    textInput.current.focus();
    textInput.current.setSelectionRange(textLength, textLength);
  }, [editText]);

  /** Retrieves text from local storage. */
  function getStorage() {
    let value = localStorage.getItem(props.label);
    value = value / 60;
    setText(value);
  }

  /** Sets values to local storage. Converts minutes to seconds. */
  function sendToStorage(value) {
    value = value * 60;
    localStorage.setItem(props.label, value);
  }

  /** Enables editing in the text field. */
  function handleOpenEdit() {
    setEditText(!editText);
  }

  /** Confirms new edits and updates the text field. */
  function handleConfirm() {
    setText(textInput.current.value);
    sendToStorage(textInput.current.value);
    handleOpenEdit();
  }

  return (
    <>
      <div className="mb-2 flex w-sm flex-row items-center rounded-lg bg-zinc-800 outline outline-gray-500">
        <label id={props.label} className="grow p-2">
          {props.label}
        </label>
        <input
          id={props.label + "-text"}
          className="m-2 h-10 max-w-20 text-center"
          type="text"
          defaultValue={text}
          disabled={editText ? false : true}
          ref={textInput}
        />
        <button
          className={`flex size-14 items-center justify-center rounded-r-lg bg-zinc-500 ${editText ? "hidden" : ""}`}
          onClick={handleOpenEdit}
        >
          <img src={EditIcon}></img>
        </button>
        <button
          className={`flex size-14 items-center justify-center rounded-r-lg bg-teal-600 ${editText ? "" : "hidden"}`}
          onClick={handleConfirm}
        >
          <img src={ConfirmIcon}></img>
        </button>
      </div>
    </>
  );
}

export default TextField;
