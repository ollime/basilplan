/** @file A card to display a task. */
import {
  attachClosestEdge,
  extractClosestEdge
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

/** A card to display (but not modify) a task.
 *
 * @param {string} props.label The name of the task.
 * @param {number} props.columnId Index of the column the task is currently in.
 */
function TaskCard(props) {
  /** Ref for current task card. @type {ref} */
  const task = useRef(null);
  /** Name value of the current task card. @type {string} */
  const taskName = props.label;
  /** Column of the current task card. @type {number} */
  const column = props.columnId;

  // used for drag and drop features
  const [dragging, setDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);

  /** Styles that ensure the drop indicator displays correctly. @type {Object} */
  const dropTargetStyles = {
    position: "relative",
    display: "inline-block"
  };

  useEffect(() => {
    /* Makes element draggable. */
    const el = task.current;
    invariant(el);

    // drag and drop logic
    return combine(
      // makes current task card draggable to other drop locations
      draggable({
        element: el,
        getInitialData: () => ({ location, taskName, column }),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false)
      }),
      // adds a drop target on current task card to allow other cards to drop here
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = {
            location: location,
            column: column,
            taskName: taskName
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"]
          });
        },
        getIsSticky: () => true,
        /* The following values set the closestEdge variable
                depending on the action being performed. */
        onDragEnter: (args) => {
          if (args.source.data.taskName != taskName) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: (args) => {
          if (args.source.data.taskName !== taskName) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        }
      })
    );
  }, [taskName]);

  return (
    <>
      <div style={dropTargetStyles} className="w-9/10">
        <div
          id={"drop-target" + taskName}
          ref={task}
          hidden={taskName == "space" ? "true" : ""}
          className={`flex h-12 items-center justify-center ${taskName == "space" ? "remove-height" : ""}`}
        >
          {taskName}
        </div>

        {/* displays DropIndicator if closest edge is dragged on */}
        {closestEdge ? <DropIndicator edge="top" /> : ""}
      </div>
    </>
  );
}

export default TaskCard;
