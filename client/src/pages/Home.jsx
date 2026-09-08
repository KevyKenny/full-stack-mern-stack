import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { TASKS_URL } from '../config/api.js'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const requestConfig = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    let active = true

    const loadTasks = async () => {
      try {
        const response = await axios.get(TASKS_URL, requestConfig)
        if (active) setTasks(response.data.tasks || [])
      } catch (err) {
        if (!active) return
        if (err.response?.status === 401) {
          clearAuth()
          navigate('/login', { replace: true })
          return
        }
        setError(err.response?.data?.message || 'Unable to load your tasks.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTasks()
    return () => {
      active = false
    }
  }, [navigate, token])

  const addTask = async (event) => {
    event.preventDefault()
    const title = newTask.trim()
    if (!title || saving) return

    setSaving(true)
    setError('')
    try {
      const response = await axios.post(TASKS_URL, { title }, requestConfig)
      setTasks((currentTasks) => [response.data.task, ...currentTasks])
      setNewTask('')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add the task.')
    } finally {
      setSaving(false)
    }
  }

  const toggleTask = async (task) => {
    setError('')
    try {
      const response = await axios.put(
        `${TASKS_URL}/${task._id}`,
        { done: !task.done },
        requestConfig,
      )
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === task._id ? response.data.task : currentTask,
        ),
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update the task.')
    }
  }

  const deleteTask = async (id) => {
    setError('')
    try {
      await axios.delete(`${TASKS_URL}/${id}`, requestConfig)
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete the task.')
    }
  }

  return (
    <div className="home-page">
      <Navbar />

      <div className="home-container">
        <h1>Task Manager</h1>

        {error && <div className="home-alert" role="alert">{error}</div>}

        <form className="add-task" onSubmit={addTask}>
          <input 
            type="text" 
            placeholder="e.g. Read chapter 4 of Bio textbook"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-label="New task title"
          />
          <button className="add-btn" type="submit" disabled={saving}>
            {saving ? 'Adding...' : 'Add'}
          </button>
        </form>

        <div className="task-list">
          {loading ? <p className="task-message">Loading your tasks...</p> : tasks.length > 0 ? (
            tasks.map((task) => (
            <div className={`task-card ${task.done ? 'completed' : ''}`} key={task._id}>
              <input 
                type="checkbox" 
                checked={task.done}
                onChange={() => toggleTask(task)}
                aria-label={`Mark ${task.title} as ${task.done ? 'pending' : 'done'}`}
              />
              <div className="task-info">
                <h3>{task.title}</h3>
                <p className={task.done ? 'task-status done' : 'task-status'}>
                  {task.done ? 'Done' : 'Pending'}
                </p>
              </div>
              <div className="task-actions">
                <Link className="edit-btn" to={`/tasks/${task._id}/edit`}>Edit</Link>
                <button className="delete-btn" type="button" onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))) : (
            <p className="task-message">You have no tasks yet. Add one above to get started.</p>
        )}
        </div>
      </div>
    </div>
  );
}