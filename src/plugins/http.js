import axios from 'axios'
import router from '@/router'
import { Message, Loading } from 'element-ui'
import { storage } from '../utils'
import Vue from 'vue'
let v = new Vue()

const WINDOW_URL = window.location.host

axios.defaults.timeout = 10000

if (WINDOW_URL === '') {
  axios.defaults.baseURL = '123.206'
} else {
  axios.defaults.baseURL = 'http://39.96.87.185'
}
console.log('init', process.env.NODE_ENV, axios.defaults.baseURL)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    console.log('validate axios')
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
    const { code, msg } = response.data
    switch (code) {
      case 0: {
        let loadingInstance = Loading.service({ fullscreen: true })
        v.$nextTick(() => {
          loadingInstance.close()
        })
        return response.data || {}
      }
      default: {
        Message({
          message: msg,
          type: 'warning',
          duration: 2000
        })
        return Promise.reject({ code, msg })
      }
    }
  },
  error => {
    const eStatus = error.response.status
    switch (eStatus) {
      case 401:
        Message({
          message: '登录过期，请重新登录',
          type: 'error',
          duration: 1500
        })
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      case 403:
        Message({
          message: '资源禁止访问',
          type: 'error',
          duration: 2000
        })
        break
      case 404:
        Message({
          message: '访问的资源不存在',
          type: 'warning',
          duration: 1500
        })
        break
      default: {
        Message({
          message: msg || `请求错误`,
          type: 'warning',
          duration: 1500
        })
      }
    }
    return Promise.reject(error)
  }

)

function baseURL() {
  return axios.defaults.baseURL
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
    let loadingInstance = Loading.service({ fullscreen: true })
    v.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close()
    })
    throw error
  })
}
function get(url, params, meta) {
  Loading.service({ fullscreen: true })
  return sendRequest('get', url, params, meta)
}

function post(url, data, meta) {
  Loading.service({ fullscreen: true })
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
