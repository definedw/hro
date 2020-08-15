import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './views/Home'
/* 404 Not Found Page */
import NotFound from './views/NotFound'

import { DashBoard } from './views/dashboard'
import { Agenda } from './views/agenda'
import { OverAgenda } from './views/overagenda'

Vue.use(Router)
/* @namedscape rule
   @ File Name To upperCase
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
      redirect: '/dashboard',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: 'dashBoard',
          component: DashBoard
        },
        {
          path: '/agenda',
          name: 'agenda',
          component: Agenda
        },
        {
          path: '/overAgenda',
          name: 'overAgenda',
          component: OverAgenda
        },
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
router.afterEach((to, from) => {
  router.app.$bus.emit('routerUpdate', {
    to,
    from
  })
})
export default router
