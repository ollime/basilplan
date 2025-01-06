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