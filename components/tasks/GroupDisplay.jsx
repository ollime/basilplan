import { useState, useEffect } from "react";
import { getTasks } from "../../src/api/task-api.js"

import GroupItem from "./GroupItem.jsx"

function GroupDisplay() {
    const [tasks, setTasks] = useState([])
    const groupList = tasks.map((task) => (
        <GroupItem
            list={task}
            key={"grouped-tasks-" + task[0]}
        />
    ))

    // TODO: move initial task load for both GroupDisplay and TaskList to App.jsx
    // initial task load
    useEffect(() => {
        let ignore = false;

        /** Unpacks array of task names.
         * @param {object} tasks all task data provided
         * @returns {Array<string>} array of task names
         */
        function formatTasks(tasks) {
            let newTasks = []
            for (let i of tasks) {
                newTasks.push({
                    name: i.task_name,
                    column: i.list,
                    row: i.position
                })
            }

            // sort by numerical order of position data
            newTasks = newTasks.sort((a, b) => a.position - b.position)
            // grouped by list
            const groupedTasks = Object.groupBy(newTasks, ({column}) => column)
            // format as array
            const groupedTaskArray = Object.keys(groupedTasks).map((key) => [key, groupedTasks[key]])
            return groupedTaskArray;
        }

        /** Intital task load. Retrieves task data and updates TaskList tasks. */
        async function getTaskData() {
            await getTasks()
            .then((response) => {
                if (!ignore) {
                    setTasks(formatTasks(response))
                }
            })
        }

        getTaskData();
        
        return() => {
            ignore = true;
        }
    }, [])

    return(
        <>
            <div className="flex flex-col w-md">
                <span className="flex justify-center items-center text-3xl size-10 bg-zinc-800 w-xs outline outline-gray-500 rounded-t-lg">
                    Grouped Tasks
                </span>
                {groupList}
            </div>
        </>
    )
}

export default GroupDisplay;