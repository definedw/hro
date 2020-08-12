import axios from 'axios'
import router from '@/router'
import { Message, Loading } from 'element-ui'
import { storage } from '../utils'

const WINDOW_URL = window.location.host

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www/form/urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    const token = storage.getToken()
    token && (config.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      let loadingInstance = Loading.service({ fullscreen: ture })
      this.$nextTick(() => {
        loadingInstance.close()
      })
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const { status } = error.response
    switch (status) {
      case 401:
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 403:
        Message({
          message: '登陆过期，请重新登录.',
          duration: 1000,
          type: 'warning'
        })
        storage.removeToken()
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
        break
      case 404:
        Message({
          message: '请求不存在',
          duration: 1500,
          type: 'warning'
        })
        break
      default:
        Message({
          message: `${error.response.msg}`,
          duration: 1500,
          type: 'warning'
        })
    }
    return Promise.reject(error.response)
  }
)

function baseUrl() {
  return axios.defaults.baseUrl
}
function sendRequest(method, url, data, meta) {
  const options = {
    get: 'params',
    post: 'data',
    download: 'data'
  }
  return axios({
    method,
    url,
    [options[method]]: data,
    meta
  }).catch(error => {
    let loadingInstance = Loading.service({ fullscreen: ture })
    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close()
    })
    throw error
  })
}
function get(url, params, meta) {
  Loading.service({ fullscreen: ture })
  return sendRequest('get', url, params, meta)
}

function post(url, data, meta) {
  Loading.service({ fullscreen: ture })
  return sendRequest('post', url, data, meta)
}
function download(url, data) {
  return axios({
    method: 'post',
    url,
    data,
    responseType: 'blob'
  }).catch(error => {

    throw error
  })
}
export default class Api {
  static install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      get() {
        return {
          baseURL,
          get,
          post,
          download
        }
      }
    })
  }
}
