import { useState } from "react";
import TaskList from "../../components/TaskList.jsx";
import Footer from "../../components/Footer.jsx";
import Clock from "../../components/Clock.jsx";
import AppContext from "../../components/AppContext.jsx";

function App() {
  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <>
      <AppContext.Provider
        value={{
          selectedTask,
          setSelectedTask
        }}>
        <Clock />
        <TaskList />
        <Footer />
      </AppContext.Provider>
    </>
  )
}

export default App