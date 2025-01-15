import {useState, useEffect, useRef, useCallback} from "react";
import { getAllTasks } from "./../src/api/task-api.js"

import invariant from "tiny-invariant";
import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';

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
        const destination = location.current.dropTargets[0];
        if (!destination) {
            return;
        }

        const currentTask = source.data.taskName;
        const currentIndex = tasks.findIndex((task) => task == currentTask)
        let newIndex;

        if (destination.element.children.length > 0) {
            const newTask = destination.element.children[0].innerHTML
            newIndex = tasks.findIndex((task) => task == newTask)
        } 
        else {
            newIndex = tasks.length;
        }

        setTasks(reorder({
            list: tasks,
            startIndex: currentIndex,
            finishIndex: newIndex,
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
                getData: () =>({ location }),
                onDragEnter: () => setIsDraggedOver(true),
                onDragLeave: () => setIsDraggedOver(false),
                onDrop: () => setIsDraggedOver(false)
            })
        )
    })

    /** Color of the drop location when an element is dragged over it. */
    function getColor(isDraggedOver) {
        if (isDraggedOver) {
            return "skyblue"
        }
        return "white";
    }

    return (
        <>
            <div className="drop-location" style={{backgroundColor: getColor(isDraggedOver)}} ref={ref}>
                {props.child}
            </div>
        </>
    )
}

function Card(props) {
    const taskName = props.label;
    const task = useRef(null)
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        /* Makes element draggable. */
        const el = task.current;
        invariant(el)

        return draggable({
            element: el,
            getInitialData: () => ({location, taskName}),
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
        })
    }, [])

    return(
        <>
            <div
                id={taskName + props.index}
                ref={task}
                className="task-item">
                {taskName}
            </div>
        </>
    )
}

export default TaskList2;