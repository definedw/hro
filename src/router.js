import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './views/Home'
/* 404 Not Found Page */
import NotFound from './views/NotFound'

import { DashBoard } from './views/dashboard'
import { Agenda, Audit, InAudit, OnTime, Complete } from './views/agenda'
import { AuditDetail, AuditList, OnTimeList, OnTimeDetail, CompleteList, CompleteDetail } from './views/agenda'

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
          component: Agenda,
          children: [
            {
              path: '/agenda/audit',
              name: 'audit',
              redirect: '/agenda/auditList',
              component: Audit,
              children: [
                {
                  path: '/agenda/auditList',
                  name: 'auditList',
                  component: AuditList
                },
                {
                  path: '/agenda/audit/:id',
                  name: 'auditDetail',
                  component: AuditDetail,
                }
              ]
            },
            {
              path: '/agenda/ontime',
              name: 'onTime',
              redirect: '/agenda/ontimeList',
              component: OnTime,
              children: [
                {
                  path: '/agenda/ontimeList',
                  name: 'onTimeList',
                  component: OnTimeList
                },
                {
                  path: '/agenda/ontime/:id',
                  name: 'onTimeDetail',
                  component: OnTimeDetail,
                }
              ]
            },
            {
              path: '/agenda/complete',
              name: 'complete',
              redirect: '/agenda/completeList',
              component: Complete,
              children: [
                {
                  path: '/agenda/completeList',
                  name: 'completeList',
                  component: CompleteList
                },
                {
                  path: '/agenda/complete/:id',
                  name: 'ompleteDetail',
                  component: CompleteDetail,
                }
              ]
            }
          ]
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
