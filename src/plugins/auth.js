import { storage } from '../utils'

let user = {}
const auth = {
  checkLoggedIn() {
    return storage.getToken() != null
  },
  signOut() {
    storage.removeToken()
  },
  set user(val) {
    user = val
    localStorage.setItem('user', JSON.stringify(user))
  },
  get user() {
    if (!user || Object.keys(user).length === 0) {
      user = JSON.parse(localStorage.getItem('user'))
    }
    return user
  }
}

export default class Auth {
  static install(Vue) {
    Object.defineProperty(Vue.prototype, '$auth', {
      get() {
        return auth
      }
    })
  }
}
