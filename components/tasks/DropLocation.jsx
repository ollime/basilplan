import { useRef, useState, useEffect } from "react";
import invariant from "tiny-invariant";
import {dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

/** Area of the page that allows for tasks to be dragged and dropped to.
 * 
 * @param {JSX} props.child Task in the drop location.
 */
function DropLocation(props) {
    const ref = useRef(null)
    /** Determines if an element is being dragged over the drop target @type {boolean} */
    const [isDraggedOver, setIsDraggedOver] = useState(false)

    useEffect(() => {
        // Defines drop target area
        const el = ref.current;
        invariant(el);

        return(
            dropTargetForElements({
                element: el,
                onDragEnter: () => setIsDraggedOver(true),
                onDragLeave: () => setIsDraggedOver(false),
                onDrop: () => setIsDraggedOver(false)
            })
        )
    })

    /** Color of the drop location when an element is dragged over it. */
    // function getColor(isDraggedOver) {
    //     if (isDraggedOver) {
    //         return "skyblue"
    //     }
    //     return "white";
    // }
    //style={{backgroundColor: getColor(isDraggedOver)}}

    return (
        <>
            <div className="drop-location" ref={ref}>
                {props.child}
            </div>
        </>
    )
}

export default DropLocation;