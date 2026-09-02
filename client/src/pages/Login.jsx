import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import { AUTH_URL } from '../config/api.js'
import { saveAuth } from '../utils/authStorage.js'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Log in | Task Manager'
    return () => {
      document.title = 'Task Manager'
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await axios.post(`${AUTH_URL}/login`, {
        email: email.trim().toLowerCase(),
        password,
      })

      saveAuth(res.data.token, res.data.user)

      const destination =
        redirectTo && redirectTo !== '/login' ? redirectTo : '/'
      navigate(destination, { replace: true, state: null })
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Login failed. Please check your email and password.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Navbar />

      <main className="login-main">
        <div className="login-card">
          <h1>Welcome back</h1>
          <p className="login-subtext">Log in to manage your tasks.</p>

          {error && (
            <div className="login-alert" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <p className="login-forgot">
              <span aria-disabled="true">Forgot password?</span>
            </p>

            <button
              type="submit"
              className="login-btn login-btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="login-footer-link">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login
