import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function ProtectedRoute({ children, adminOnly = false, employeeOnly = false }) {
  const location = useLocation()
  const { isAuthenticated: authed, user } = useAuth()

  if (!authed) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  if (employeeOnly && user?.role === 'admin') {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
