import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { TASKS_URL, API_BASE_URL } from '../config/api.js'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import { getInitials } from '../utils/getInitials.js'
import './AdminTasks.css'

function getPersonName(person) {
  if (!person) return 'Unassigned'
  return person.fullName || `${person.firstName || ''} ${person.lastName || ''}`.trim() || person.email
}

export default function AdminTasks() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [assignee, setAssignee] = useState('all')
  const [newTitle, setNewTitle] = useState('')
  const [newAssignee, setNewAssignee] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const requestConfig = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    let active = true

    const loadData = async () => {
      try {
        const [tasksResponse, usersResponse] = await Promise.all([
          axios.get(TASKS_URL, requestConfig),
          axios.get(`${API_BASE_URL}/users`, requestConfig),
        ])
        if (active) {
          setTasks(tasksResponse.data.tasks || [])
          setUsers(usersResponse.data.users || [])
        }
      } catch (err) {
        if (!active) return
        if (err.response?.status === 401) {
          clearAuth()
          navigate('/login', { replace: true })
          return
        }
        setError(err.response?.data?.message || 'Unable to load admin tasks.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadData()
    return () => {
      active = false
    }
  }, [navigate, token])

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((task) => !task.done).length,
    completed: tasks.filter((task) => task.done).length,
  }), [tasks])

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const assignedName = getPersonName(task.assignedTo)
      const createdByName = getPersonName(task.createdBy)
      const matchesSearch = !query || [task.title, assignedName, createdByName]
        .some((value) => value?.toLowerCase().includes(query))
      const matchesStatus = status === 'all' || (status === 'done' ? task.done : !task.done)
      const matchesAssignee = assignee === 'all' || task.assignedTo?._id === assignee
      return matchesSearch && matchesStatus && matchesAssignee
    })
  }, [assignee, search, status, tasks])

  const handleAddTask = async (event) => {
    event.preventDefault()
    const title = newTitle.trim()
    if (!title || saving) return

    setSaving(true)
    setError('')
    try {
      const response = await axios.post(
        TASKS_URL,
        { title, ...(newAssignee ? { assignedTo: newAssignee } : {}) },
        requestConfig,
      )
      setTasks((currentTasks) => [response.data.task, ...currentTasks])
      setNewTitle('')
      setNewAssignee('')
      setShowAddForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add the task.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return

    setError('')
    try {
      await axios.delete(`${TASKS_URL}/${id}`, requestConfig)
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete the task.')
    }
  }

  return (
    <div className="admin-tasks-page">
      <Navbar />
      <main className="admin-tasks-main">
        <section className="admin-tasks-card">
          <div className="admin-tasks-header">
            <div>
              <span className="admin-tasks-badge">Admin dashboard</span>
              <h1>All tasks</h1>
              <p className="admin-tasks-lead">View and manage tasks from every employee.</p>
            </div>
            <button className="admin-tasks-primary" type="button" onClick={() => setShowAddForm((open) => !open)}>
              {showAddForm ? 'Close' : '+ Add task'}
            </button>
          </div>

          {showAddForm && (
            <form className="admin-add-form" onSubmit={handleAddTask}>
              <label htmlFor="new-admin-task">Task title</label>
              <input
                id="new-admin-task"
                type="text"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Enter a task title"
                maxLength={200}
                required
              />
              <label htmlFor="new-task-assignee">Assign to</label>
              <select id="new-task-assignee" value={newAssignee} onChange={(event) => setNewAssignee(event.target.value)}>
                <option value="">Me</option>
                {users.map((user) => <option key={user._id} value={user._id}>{getPersonName(user)}</option>)}
              </select>
              <button className="admin-tasks-primary" type="submit" disabled={saving}>
                {saving ? 'Adding...' : 'Add task'}
              </button>
            </form>
          )}

          {error && <div className="admin-tasks-alert" role="alert">{error}</div>}

          <div className="admin-stats-row">
            <div className="admin-stat-card"><strong>{stats.total}</strong><span>Total tasks</span></div>
            <div className="admin-stat-card pending"><strong>{stats.pending}</strong><span>Pending</span></div>
            <div className="admin-stat-card done"><strong>{stats.completed}</strong><span>Completed</span></div>
          </div>

          <div className="admin-filter-bar">
            <label className="sr-only" htmlFor="task-search">Search tasks</label>
            <input id="task-search" type="search" placeholder="Search tasks..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <label className="sr-only" htmlFor="status-filter">Filter by status</label>
            <select id="status-filter" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            <label className="sr-only" htmlFor="assignee-filter">Filter by assignee</label>
            <select id="assignee-filter" value={assignee} onChange={(event) => setAssignee(event.target.value)}>
              <option value="all">All employees</option>
              {users.map((user) => <option key={user._id} value={user._id}>{getPersonName(user)}</option>)}
            </select>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-task-table">
              <thead>
                <tr><th>Task</th><th>Status</th><th>Assigned to</th><th>Created by</th><th>Date created</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {loading ? <tr><td className="admin-task-message" colSpan="6">Loading tasks...</td></tr> : filteredTasks.length === 0 ? (
                  <tr><td className="admin-task-message" colSpan="6">No tasks match these filters.</td></tr>
                ) : filteredTasks.map((task) => {
                  const assignedName = getPersonName(task.assignedTo)
                  return (
                    <tr key={task._id}>
                      <td data-label="Task">{task.title}</td>
                      <td data-label="Status"><span className={`admin-task-status ${task.done ? 'done' : 'pending'}`}>{task.done ? 'Done' : 'Pending'}</span></td>
                      <td data-label="Assigned to"><span className="admin-person"><span className="admin-mini-avatar">{getInitials(task.assignedTo?.firstName, task.assignedTo?.lastName)}</span>{assignedName}</span></td>
                      <td data-label="Created by">{getPersonName(task.createdBy)}</td>
                      <td data-label="Date created">{new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td data-label="Actions"><div className="admin-row-actions"><button className="admin-edit-button" type="button" onClick={() => navigate(`/tasks/${task._id}/edit`)}>Edit</button><button className="admin-delete-button" type="button" onClick={() => handleDelete(task._id)}>Delete</button></div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}