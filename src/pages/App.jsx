import { useState } from "react";
import TaskList from "../../components/tasks/TaskList.jsx";
import Footer from "../../components/Footer.jsx";
import Clock from "../../components/Clock.jsx";
import AppContext from "../../components/AppContext.jsx";
import GroupDisplay from "../../components/tasks/GroupDisplay.jsx";

/** Main page. Includes timer and task list. */
function App() {
  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <>
      <AppContext.Provider
        value={{
          selectedTask,
          setSelectedTask
        }}>
        <div className="flex md:flex-row gap-5 flex-col-reverse">
        <TaskList />
        <Clock />
        </div>
        <GroupDisplay />
        <Footer />
      </AppContext.Provider>
    </>
  )
}

export default App