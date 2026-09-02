import { useEffect, useState } from 'react'
import {
  clearStaleAuth,
  getToken,
  getUser,
  isAuthenticated,
  subscribeToAuthChanges,
} from '../utils/authStorage.js'

export function useAuth() {
  const [, setVersion] = useState(0)

  useEffect(() => subscribeToAuthChanges(() => setVersion((v) => v + 1)), [])

  useEffect(() => {
    if (clearStaleAuth()) {
      setVersion((v) => v + 1)
    }
  })

  return {
    token: getToken(),
    user: getUser(),
    isAuthenticated: isAuthenticated(),
  }
}
