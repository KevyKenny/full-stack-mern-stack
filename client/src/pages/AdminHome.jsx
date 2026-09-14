import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { TASKS_URL } from '../config/api.js'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import { getInitials } from '../utils/getInitials.js'
import './Home.css'
import './AdminHome.css'

export default function AdminHome() {
  const navigate = useNavigate()
  const { token, user } = useAuth()
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
        setError(err.response?.data?.message || 'Unable to load tasks.')
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

  const displayName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
  const initials = getInitials(user?.firstName, user?.lastName)

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-container admin-home-container">
        <div className="admin-profile-bar">
          <span className="admin-role-badge">
            Viewing as: Admin
            <span className="admin-quick-links">
              <Link to="/admin/tasks">Admin Tasks</Link>
              <span aria-hidden="true">|</span>
              <Link to="/admin/employees">Employees</Link>
            </span>
          </span>
          <div className="admin-user" title={displayName}>
            <span className="avatar" aria-hidden="true">{initials}</span>
            <span className="avatar-name">{displayName}</span>
          </div>
        </div>

        <h1>Task Manager</h1>

        {error && <div className="home-alert" role="alert">{error}</div>}

        <form className="add-task" onSubmit={addTask}>
          <input
            type="text"
            placeholder="e.g. Read chapter 4 of Bio textbook"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            aria-label="New task title"
          />
          <button className="add-btn" type="submit" disabled={saving}>
            {saving ? 'Adding...' : 'Add'}
          </button>
        </form>

        <div className="task-list">
          {loading ? <p className="task-message">Loading tasks...</p> : tasks.length > 0 ? (
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
            ))
          ) : (
            <p className="task-message">There are no tasks yet. Add one above to get started.</p>
          )}
        </div>
      </main>
    </div>
  )
}