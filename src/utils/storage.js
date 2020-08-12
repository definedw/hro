export default {
  getToken() {
    const token = localStorage.getItem('token')
    if (typeof token === 'string' && token.length > 0) {
      return token
    } else {
      return null
    }
  },
  removeToken() {
    localStorage.removeItem('token')
  },
  setToken(token) {
    if (typeof token === 'string' && token.length > 0) {
      localStorage.setItem('token', token)
    }
  }
}
