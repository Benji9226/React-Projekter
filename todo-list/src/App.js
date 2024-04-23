import './App.css';
import React from 'react'
import { useState } from 'react'
import { CustomForm } from './components/CustomForm';
import { TaskList } from './components/TaskList';

function App() {
const [task, setTask] = useState([])

const addTask = (task) =>{
  setTask(prevState => [...prevState, task])
}

const deleteTask = (id) =>{
  setTask (prevState => prevState.filter(t => t.id !== id));
}

const updateTask = (id) => {
  setTask(prevState => prevState.map(t => (t.id == id ? { ...t, checked: !t.checked } : t)))
}

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      <CustomForm addTask={addTask}/>
      {task && (
        <TaskList 
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
          />
      )}
    </div>
  )
}

export default App;
