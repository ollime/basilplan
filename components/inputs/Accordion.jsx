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
            <details>
                    <summary className="p-4 h-12">
                        <span>
                            {props.title}
                        </span>
                    </summary>
                {props.content}
            </details>
        </>
    )
}

export default Accordion;