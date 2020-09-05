import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './views/Home'
/* 404 Not Found Page */
import NotFound from './views/NotFound'

import { DashBoard } from './views/dashboard'
import { Agenda, Audit, OnTime, Complete, All } from './views/agenda'
import { AuditList, OnTimeList, CompleteList, EAllList } from './views/agenda'
import { AllCsv, CountCsv, SelfCsv, AllList, CountList, SelfList } from './views/overagenda'
import { Detail } from './views/agenda'
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
          redirect: '/agenda/audit',
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
                  name: 'agendaDetail',
                  component: Detail,
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
                  component: Detail,
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
                  component: Detail,
                }
              ]
            },
            {
              path: '/agenda/all',
              name: 'all',
              redirect: '/agenda/allList',
              component: All,
              children: [
                {
                  path: '/agenda/allList',
                  name: 'allList',
                  component: EAllList
                },
                {
                  path: '/agenda/all/:id',
                  name: 'ompleteDetail',
                  component: Detail,
                }
              ]
            }
          ]
        },
        {
          path: '/overAgenda',
          name: 'overAgenda',
          redirect: '/overAgenda/selfCsv',
          component: OverAgenda,
          children: [
            {
              path: '/overAgenda/allCsv',
              name: 'allCsv',
              redirect: '/overAgenda/allList',
              component: AllCsv,
              children: [
                {
                  path: '/overAgenda/allList',
                  name: 'allList',
                  component: AllList
                }
              ]
            },
            {
              path: '/overAgenda/countCsv',
              name: 'countCsv',
              redirect: '/overAgenda/countList',
              component: CountCsv,
              children: [
                {
                  path: '/overAgenda/countList',
                  name: 'countList',
                  component: CountList
                }
              ]
            },
            {
              path: '/overAgenda/selfCsv',
              name: 'selfCsv',
              redirect: '/overAgenda/selfList',
              component: SelfCsv,
              children: [
                {
                  path: '/overAgenda/selfList',
                  name: 'selfList',
                  component: SelfList
                }
              ]
            },
          ]
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
