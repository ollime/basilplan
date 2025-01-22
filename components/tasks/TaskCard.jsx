import { useRef, useState, useEffect } from "react";

import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import {
    attachClosestEdge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

/** A card to display (but not modify) a task.
 * 
 * @param {string} props.label The name of the task.
 * @param {number} props.columnId Index of the column the task is currently in.
 */
function TaskCard(props) {
    const taskName = props.label;
    const task = useRef(null)
    const column = props.columnId;
    const [dragging, setDragging] = useState(false);
    const [closestEdge, setClosestEdge] = useState(null)
    const dropTargetStyles = {
        position: "relative",
        display: "inline-block",
    };

    useEffect(() => {
        /* Makes element draggable. */
        const el = task.current;
        invariant(el)

        return combine(
            draggable({
            element: el,
            getInitialData: () => ({location, taskName, column}),
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false)
            }),
            // adds a drop target to allow other cards to drop here
            dropTargetForElements({
                element: el,
                getData: ({input, element}) => {
                    const data = {
                        location: location,
                        column: column,
                        taskName: taskName,
                    }
                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ["top", "bottom"]
                    })
                },
                getIsSticky: () => true,
                /* The following values set the closestEdge variable
                depending on the action being performed. */
                onDragEnter: (args) => {
                    if (args.source.data.taskName != taskName) {
                        setClosestEdge(extractClosestEdge(args.self.data))
                    }
                },
                onDrag: (args) => {
                    if (args.source.data.taskName !== taskName) {
                        setClosestEdge(extractClosestEdge(args.self.data))
                    }
                },
                onDragLeave: () => {
                    setClosestEdge(null)
                },
                onDrop() {
                    setClosestEdge(null)
                }
            })
        )
        
    }, [taskName])

    return(
        <>
            <div style={dropTargetStyles}>
                <div
                    id={"drop-target" + taskName}
                    ref={task}
                    className="task-item">
                    {taskName}
                </div>

                {/* displays DropIndicator if closest edge is dragged on */}
                {closestEdge ? <DropIndicator edge="top" /> : ""}
            </div>
        </>
    )
}

export default TaskCard;