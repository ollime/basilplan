import { useState } from "react";
import TaskList from "../../components/TaskList.jsx";
import Footer from "../../components/Footer.jsx";
import Clock from "../../components/Clock.jsx";
import TaskList2 from "../../components/TaskList2.jsx";
import AppContext from "../../components/AppContext.jsx";

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
        {/* <Clock />
        <TaskList /> */}
        <TaskList2 />
        <Footer />
      </AppContext.Provider>
    </>
  )
}

export default App