import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearAuth } from '../utils/authStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import { getInitials } from '../utils/getInitials.js'
import './Navbar.css'

const GUEST_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/signup', label: 'Sign up' },
  { to: '/login', label: 'Login' },
]

const EMPLOYEE_LINKS = [{ to: '/', label: 'Home' }]

const ADMIN_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/admin/tasks', label: 'Admin Tasks' },
  { to: '/admin/employees', label: 'Employees' },
]

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated: authed, user } = useAuth()

  const isAdmin = authed && user?.role === 'admin'

  const links = !authed
    ? GUEST_LINKS
    : isAdmin
      ? ADMIN_LINKS
      : EMPLOYEE_LINKS

  const isActive = (path) => location.pathname === path

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    clearAuth()
    closeMenu()
    navigate('/login', { replace: true, state: null })
  }

  const displayName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
  const initials = user ? getInitials(user.firstName, user.lastName) : ''

  return (
    <nav className="navbar">
      <div className={`nav-inner${isAdmin ? ' nav-inner-admin' : ''}`}>
        <Link to="/" className="brand" onClick={closeMenu}>
          Task Manager
        </Link>

        <div className="nav-end">
          {authed && user && (
            <div className="nav-avatar" title={displayName} aria-label={displayName}>
              {initials}
            </div>
          )}

          <button
            type="button"
            className="hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>

        <ul
          className={`nav-links${menuOpen ? ' open' : ''}${isAdmin ? ' nav-links-admin' : ''}`}
          id="navLinks"
        >
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={isActive(to) ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}

            {authed && (
              <li>
                <button type="button" className="nav-logout" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            )}
          </ul>
      </div>
    </nav>
  )
}

export default Navbar
