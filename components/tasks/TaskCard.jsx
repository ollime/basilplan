import { useRef, useState, useEffect } from "react";

import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import {
    attachClosestEdge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

function TaskCard(props) {
    const taskName = props.label;
    const task = useRef(null)
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
            getInitialData: () => ({location, taskName}),
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false)
            }),
            // adds a drop target to allow other cards to drop here
            dropTargetForElements({
                element: el,
                getData: ({input, element}) => {
                    const data = {
                        location: location,
                        taskName: taskName
                    }
                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ["top", "bottom"]
                    })
                },
                getIsSticky: () => true,
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
                    id={taskName + props.index}
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