import Vue from 'vue'
import App from './App.vue'
import eRouter from './router.js'
import { http, auth, bus } from './plugins/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/filters'

import './assets/scss/index.scss'
Vue.config.productionTip = false

Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})
Vue.use(ElementUI)

Vue.use(http)
Vue.use(auth)
Vue.use(bus)
Vue.filter('UTCTime', function (value) {
  if (!value) {
    return ''
  } else {
    let date = new Date(
      value
        .toString()
        .substring(0, 10)
        .replace(/-/g, '/')
    )
    let chinaDate = date.toDateString()
    let chinaDateArray = chinaDate.split(' ')
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let displayDate = `${chinaDateArray[2]}-${month}-${
      chinaDateArray[3]
      }`
    return displayDate
  }
})

new Vue({
  router: eRouter,
  render: h => h(App)
}).$mount('#app')

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}
