/**
 * Open and collapse a menu for a list of items.
 *
 * @param {*} props.title Accordion title.
 * @param {*} props.content Any HTML to hide under the accordion. */
function Accordion(props) {
  return (
    <>
      <details>
        <summary className="h-12 p-4">
          <span>{props.title}</span>
        </summary>
        {props.content}
      </details>
    </>
  );
}

export default Accordion;
