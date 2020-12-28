import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
