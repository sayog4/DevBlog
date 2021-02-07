export const setLS = token => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
  return null
}
export const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    return token
  }
  return null
}

export const removeFromLS = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}
