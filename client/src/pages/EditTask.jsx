import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { TASKS_URL } from '../config/api.js'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import './EditTask.css'

export default function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token, user } = useAuth()
  const [title, setTitle] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const requestConfig = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    let active = true

    const loadTask = async () => {
      try {
        const response = await axios.get(`${TASKS_URL}/${id}`, requestConfig)
        if (active) {
          setTitle(response.data.task.title)
          setDone(response.data.task.done)
        }
      } catch (err) {
        if (!active) return
        if (err.response?.status === 401) {
          clearAuth()
          navigate('/login', { replace: true })
          return
        }
        setError(err.response?.data?.message || 'Unable to load this task.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadTask()
    return () => {
      active = false
    }
  }, [id, navigate, token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextTitle = title.trim()
    if (!nextTitle || saving) return

    setSaving(true)
    setError('')
    try {
      await axios.put(`${TASKS_URL}/${id}`, { title: nextTitle, done }, requestConfig)
      navigate(user?.role === 'admin' ? '/admin/tasks' : '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save this task.')
      setSaving(false)
    }
  }

  return (
    <div className="edit-task-page">
      <Navbar />
      <main className="edit-task-main">
        <section className="edit-task-card">
          <p className="edit-task-kicker">Update your task details</p>
          <h1>Edit task</h1>

          {error && <div className="edit-task-alert" role="alert">{error}</div>}

          {loading ? <p>Loading task...</p> : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="task-title">Task title</label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={200}
              />

              <fieldset>
                <legend>Status</legend>
                <label>
                  <input
                    type="radio"
                    name="status"
                    checked={!done}
                    onChange={() => setDone(false)}
                  />
                  Pending
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    checked={done}
                    onChange={() => setDone(true)}
                  />
                  Done
                </label>
              </fieldset>

              <div className="edit-task-actions">
                <Link
                  className="edit-task-cancel"
                  to={user?.role === 'admin' ? '/admin/tasks' : '/'}
                >
                  Cancel
                </Link>
                <button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}
