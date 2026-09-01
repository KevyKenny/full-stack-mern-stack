export function getInitials(firstName = '', lastName = '') {
  const first = firstName.trim().charAt(0).toUpperCase()
  const last = lastName.trim().charAt(0).toUpperCase()
  return `${first}${last}` || '?'
}
