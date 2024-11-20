import { useState } from 'react'
import TaskList from "./../components/TaskList.jsx"
import Footer from "./../components/Footer.jsx"
import Clock from "./../components/Clock.jsx"

function App() {

  return (
    <>
      <Clock />
      <TaskList />
      <Footer />
    </>
  )
}

export default App