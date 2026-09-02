import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import { AUTH_URL } from '../config/api.js'
import { saveAuth } from '../utils/authStorage.js'
import { getInitials } from '../utils/getInitials.js'
import './SignUp.css'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  jobTitle: '',
}

function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successUser, setSuccessUser] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    document.title = 'Sign up | Task Manager'
    return () => {
      document.title = 'Task Manager'
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = form

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      return 'Please fill in all required fields.'
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters.'
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }

    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      }

      if (form.department.trim()) payload.department = form.department.trim()
      if (form.jobTitle.trim()) payload.jobTitle = form.jobTitle.trim()

      const res = await axios.post(`${AUTH_URL}/register`, payload)

      saveAuth(res.data.token, res.data.user)
      setSuccessUser(res.data.user)
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Sign up failed. Please check your details and try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (successUser) {
    const initials = getInitials(successUser.firstName, successUser.lastName)

    return (
      <div className="auth-page">
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-card auth-card--success">
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <h1>Welcome, {successUser.firstName}!</h1>
          <p className="auth-lead">
            Your account was created. You are signed in as an{' '}
            <strong>{successUser.role}</strong>.
          </p>
          <p className="auth-email">{successUser.email}</p>

          <button
            type="button"
            className="auth-btn auth-btn--primary"
            onClick={() => navigate('/')}
          >
            Go to Task Manager
          </button>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-wrapper">
      <div className="auth-card">
        <p className="auth-eyebrow">Task Manager</p>
        <h1>Create your account</h1>
        <p className="auth-lead">Sign up to start managing your tasks.</p>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="firstName">First name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="lastName">Last name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password *</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm password *</label>
            <div className="password-input">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                type="text"
                value={form.department}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="jobTitle">Job title</label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={form.jobTitle}
                onChange={handleChange}
                autoComplete="organization-title"
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default SignUp
