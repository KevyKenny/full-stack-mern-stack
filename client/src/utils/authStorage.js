const TOKEN_KEY = 'taskmanager_token'
const USER_KEY = 'taskmanager_user'
const AUTH_CHANGE_EVENT = 'auth-change'

function dispatchAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}

export function saveAuth(token, user) {
  if (!token || !user) {
    throw new Error('Invalid auth response')
  }

  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  dispatchAuthChange()
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    const user = JSON.parse(raw)
    return user && typeof user === 'object' ? user : null
  } catch {
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  dispatchAuthChange()
}

export function isAuthenticated() {
  const token = getToken()
  const user = getUser()
  return Boolean(token && user)
}

export function clearStaleAuth() {
  const token = getToken()
  const user = getUser()

  if ((token && !user) || (!token && user)) {
    clearAuth()
    return true
  }

  return false
}

export function subscribeToAuthChanges(callback) {
  window.addEventListener(AUTH_CHANGE_EVENT, callback)
  return () => window.removeEventListener(AUTH_CHANGE_EVENT, callback)
}
