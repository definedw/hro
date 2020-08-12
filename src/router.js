import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './views/Home'

/* 404 Not Found Page */
import NotFound from './views/NotFound'

Vue.use(Router)
/* @namedscape rule
   @ File Name ToupperCase
   @ Name Low upper case */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: Home
      // ,
      // children: [
      //   {

      //   }
      // ]
    },
    {
      path: '*',
      redirect: '/notFound'
    }
  ]
})
export default router
