import {useState, useEffect, useRef, useCallback} from "react";
import { getAllTasks } from "./../src/api/task-api.js"

import invariant from "tiny-invariant";
import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import {
    attachClosestEdge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

function TaskList2() {
    /** List of task labels. @type {Array<string>} */
    const [tasks, setTasks] = useState([]);
    const taskList = tasks.map((task, index) => (
        <DropLocation 
            child={
                <Card
                    label={task}
                    index={index}
                    key={task + index}
                />
            }
            key={task + index}
        />
    ))

    useEffect(() => {
        let ignore = false;

        /** Unpacks array of task names. */
        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push(i.task_name)
            }
            return newTasks;
        }

        /** Intital task load. Retrieves task data and updates TaskList tasks. */
        async function getTaskData() {
            await getAllTasks()
            .then((response) => {
                if (!ignore) {
                    setTasks(formatTasks(response))
                }
            })
        }

        getTaskData()

        return() => {
            ignore = true;
        }
    }, [])

    /** Callback function when a task is dropped on the list. */
    const handleDrop = useCallback(({ source, location }) => {
        // checks if new location is a valid drop target
        const destination = location.current.dropTargets[0];
        if (!destination) {
            return;
        }

        // finds the current task location
        const currentTask = source.data.taskName;
        const currentIndex = tasks.findIndex((task) => task == currentTask)
        let newIndex;

        if (destination.element.innerHTML) {
            // finds the new location to drop the task
            const newTask = destination.element.innerHTML
            newIndex = tasks.findIndex((task) => task == newTask)
        } 
        else {
            // if empty task, adds to end of the list
            newIndex = tasks.length;
        }

        /* account for the fact that the current task
        is a part of the list - index should change based
        on whether it is above or below the new task */
        const positionModifier = newIndex < currentIndex ? 0 : -1

        // reorder the tasks
        setTasks(reorder({
            list: tasks,
            startIndex: currentIndex,
            finishIndex: newIndex + positionModifier,
        }))
    }, [tasks])

    useEffect(() => {
        return monitorForElements({
                onDrop: handleDrop,
        })
    }, [handleDrop, tasks])

    return(
        <>
            <div>
                <div id="task">
                    <div id="task-label" className="label">Task</div>
                    {taskList}
                    <DropLocation />
                </div>
            </div>
        </>
    )
}

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

function Card(props) {
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
            // onDrop: (args) => {
            //     setIsDraggedOver(false)
            //     const closestEdgeOfTarget = extractClosestEdge(arguments.self.data);
            // }    
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
                {/* displays DropIndicator if closest edge */}

                {closestEdge ? <DropIndicator edge="top" /> : ""}
            </div>
        </>
    )
}

// function DropIndicator(props) {
//     const edgeClassMap = {
//         top: "edge-top",
//         bottom: "edge-bottom"
//     }

//     const edgeClass = edgeClassMap[props.edge]
//     const style = {
//         "--gap" : props.gap,
//     }

//     console.log("jdsklfjdfksdjkfs")

//     return <div className={`drop-indicator ${edgeClass}`} style={style}>dfsdklf</div>
// }

export default TaskList2;