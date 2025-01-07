/**
 * Open and collapse a menu for a list of items.
 * 
 * @param {*} props.title Accordion title.
 * @param {*} props.content Any HTML to hide under the accordion.
 * 
 * @returns {JSX} Accordion component
 */
function Accordion(props) {
    return (
        <>
            <details className="accordion">
                <summary>{props.title}</summary>
                {props.content}
            </details>
        </>
    )
}

export default Accordion;