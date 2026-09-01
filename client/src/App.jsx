"use client"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { getToken } from './utils/authStorage.js'

const API_URL = 'http://localhost:3000/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const authHeaders = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const getTasks = async () => {
    const res = await axios.get(API_URL, { headers: authHeaders() })
    setTasks(res.data.tasks || res.data)
  }

  useEffect(() => {
    document.title = 'Task Manager'
    getTasks()
  }, [])

  const handleAdd = async () => {
    if (input.trim() === '') return
    await axios.post(API_URL, { title: input }, { headers: authHeaders() })
    setInput('')
    getTasks()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: authHeaders() })
    getTasks()
  }

  const handleStatusChange = async (id, done) => {
    await axios.put(`${API_URL}/${id}`, { done }, { headers: authHeaders() })
    getTasks()
  }

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="app-header">
          <h1>Task Manager</h1>
          <Link className="signup-link" to="/signup">Sign up</Link>
        </div>

        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new task..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn-add" onClick={handleAdd}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className={`task-card ${task.done ? 'done' : ''}`}>
              
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name={`status-${task._id}`}
                    checked={!task.done}
                    onChange={() => handleStatusChange(task._id, false)}
                  />
                  Pending
                </label>
                <label>
                  <input 
                    type="radio" 
                    name={`status-${task._id}`}
                    checked={task.done}
                    onChange={() => handleStatusChange(task._id, true)}
                  />
                  Done
                </label>
              </div>

              <span className="task-title">{task.title}</span>

              <button 
                className="btn-delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App