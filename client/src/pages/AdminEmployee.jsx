import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { API_BASE_URL } from '../config/api.js'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import { getInitials } from '../utils/getInitials.js'
import './AdminEmployee.css'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  department: '',
  jobTitle: '',
  role: 'employee',
}

function getName(user) {
  return user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
}

export default function AdminEmployee() {
  const navigate = useNavigate()
  const { token, user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [form, setForm] = useState(emptyForm)
  const [editingUser, setEditingUser] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const requestConfig = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    let active = true

    const loadUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (active) setUsers(response.data.users || [])
      } catch (err) {
        if (!active) return
        if (err.response?.status === 401) {
          clearAuth()
          navigate('/login', { replace: true })
          return
        }
        setError(err.response?.data?.message || 'Unable to load employees.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUsers()
    return () => {
      active = false
    }
  }, [navigate, token])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return users.filter((employee) => {
      const matchesSearch = !query || [getName(employee), employee.email]
        .some((value) => value?.toLowerCase().includes(query))
      return matchesSearch && (roleFilter === 'all' || employee.role === roleFilter)
    })
  }, [roleFilter, search, users])

  const openCreatePanel = () => {
    setEditingUser(null)
    setForm(emptyForm)
    setError('')
    setPanelOpen(true)
  }

  const openEditPanel = (employee) => {
    setEditingUser(employee)
    setForm({
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      email: employee.email || '',
      password: '',
      department: employee.department || '',
      jobTitle: employee.jobTitle || '',
      role: employee.role || 'employee',
    })
    setError('')
    setPanelOpen(true)
  }

  const closePanel = () => {
    if (!saving) setPanelOpen(false)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload = { ...form }
    if (editingUser && !payload.password) delete payload.password

    try {
      const response = editingUser
        ? await axios.put(`${API_BASE_URL}/users/${editingUser.id}`, payload, requestConfig)
        : await axios.post(`${API_BASE_URL}/users`, payload, requestConfig)
      setUsers((currentUsers) => editingUser
        ? currentUsers.map((employee) => employee.id === editingUser.id ? response.data.user : employee)
        : [response.data.user, ...currentUsers])
      setPanelOpen(false)
      setForm(emptyForm)
      setEditingUser(null)
    } catch (err) {
      setError(err.response?.data?.message || `Unable to ${editingUser ? 'update' : 'create'} the employee.`)
    } finally {
      setSaving(false)
    }
  }

  const changeRole = async (employee) => {
    const nextRole = employee.role === 'admin' ? 'employee' : 'admin'
    if (employee.id === currentUser?.id) return
    if (!window.confirm(`Change ${getName(employee)} to ${nextRole}?`)) return

    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${employee.id}/role`, { role: nextRole }, requestConfig)
      setUsers((currentUsers) => currentUsers.map((item) => item.id === employee.id ? response.data.user : item))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to change the employee role.')
    }
  }

  const toggleStatus = async (employee) => {
    if (employee.id === currentUser?.id) return
    const nextStatus = !employee.isActive
    if (!window.confirm(`${nextStatus ? 'Activate' : 'Deactivate'} ${getName(employee)}?`)) return

    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${employee.id}/status`, { isActive: nextStatus }, requestConfig)
      setUsers((currentUsers) => currentUsers.map((item) => item.id === employee.id ? response.data.user : item))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update employee status.')
    }
  }

  return (
    <div className="admin-employees-page">
      <Navbar />
      <main className="admin-employees-main">
        <section className="admin-employees-card">
          <div className="admin-employees-header">
            <div>
              <span className="admin-employees-badge">Admin dashboard</span>
              <h1>Manage employees</h1>
              <p className="admin-employees-lead">Create, update, and manage employee accounts.</p>
            </div>
            <button className="employee-primary-button" type="button" onClick={openCreatePanel}>+ Add employee</button>
          </div>

          {panelOpen && (
            <section className="employee-form-panel">
              <h2>{editingUser ? 'Edit employee' : 'Add employee'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="employee-form-grid">
                  <label>First name<input name="firstName" value={form.firstName} onChange={handleFormChange} required /></label>
                  <label>Last name<input name="lastName" value={form.lastName} onChange={handleFormChange} required /></label>
                  <label>Email<input name="email" type="email" value={form.email} onChange={handleFormChange} required /></label>
                  <label>Password<input name="password" type="password" value={form.password} onChange={handleFormChange} minLength="8" required={!editingUser} placeholder={editingUser ? 'Leave blank to keep current' : ''} /></label>
                  <label>Department<input name="department" value={form.department} onChange={handleFormChange} /></label>
                  <label>Job title<input name="jobTitle" value={form.jobTitle} onChange={handleFormChange} /></label>
                  <label>Role<select name="role" value={form.role} onChange={handleFormChange}><option value="employee">Employee</option><option value="admin">Admin</option></select></label>
                </div>
                <div className="employee-form-actions">
                  <button className="employee-primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : editingUser ? 'Save changes' : 'Create employee'}</button>
                  <button className="employee-secondary-button" type="button" onClick={closePanel} disabled={saving}>Cancel</button>
                </div>
              </form>
            </section>
          )}

          {error && <div className="employee-alert" role="alert">{error}</div>}

          <div className="employee-filter-bar">
            <label className="employee-sr-only" htmlFor="employee-search">Search employees</label>
            <input id="employee-search" type="search" placeholder="Search by name or email..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <label className="employee-sr-only" htmlFor="employee-role-filter">Filter by role</label>
            <select id="employee-role-filter" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">All roles</option><option value="employee">Employee</option><option value="admin">Admin</option></select>
          </div>

          <div className="employee-table-wrap">
            <table className="employee-table">
              <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {loading ? <tr><td className="employee-message" colSpan="5">Loading employees...</td></tr> : filteredUsers.length === 0 ? <tr><td className="employee-message" colSpan="5">No employees match these filters.</td></tr> : filteredUsers.map((employee) => {
                  const isSelf = employee.id === currentUser?.id
                  return (
                    <tr key={employee.id}>
                      <td data-label="Employee"><span className="employee-person"><span className="employee-avatar">{getInitials(employee.firstName, employee.lastName)}</span><span><strong>{getName(employee)}</strong><small>{employee.email}</small></span></span></td>
                      <td data-label="Department">{employee.department || 'Not specified'}</td>
                      <td data-label="Role"><span className={`employee-pill role-${employee.role}`}>{employee.role === 'admin' ? 'Admin' : 'Employee'}</span></td>
                      <td data-label="Status"><span className={`employee-pill status-${employee.isActive ? 'active' : 'inactive'}`}>{employee.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td data-label="Actions"><div className="employee-row-actions"><button className="employee-edit-button" type="button" onClick={() => openEditPanel(employee)}>Edit</button><button className="employee-role-button" type="button" onClick={() => changeRole(employee)} disabled={isSelf}>Change role</button><button className={employee.isActive ? 'employee-deactivate-button' : 'employee-activate-button'} type="button" onClick={() => toggleStatus(employee)} disabled={isSelf}>{employee.isActive ? 'Deactivate' : 'Activate'}</button></div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <Link className="employee-back-link" to="/home">&#8592; Back to Home</Link>
        </section>
      </main>
    </div>
  )
}