import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/paket',
    name: 'paket',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Paket.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../components/Profile.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "profile" */ '../components/Cart.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "profile" */ '../components/History.vue'),
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
