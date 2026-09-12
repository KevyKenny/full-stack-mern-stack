import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function GuestRoute({ children }) {
  const { isAuthenticated: authed, user } = useAuth()

  if (authed) {
    return <Navigate to={user?.role === 'admin' ? '/home' : '/'} replace />
  }

  return children
}

export default GuestRoute
