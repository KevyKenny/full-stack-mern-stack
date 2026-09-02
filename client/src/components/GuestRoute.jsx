import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function GuestRoute({ children }) {
  const { isAuthenticated: authed } = useAuth()

  if (authed) {
    return <Navigate to="/" replace />
  }

  return children
}

export default GuestRoute
