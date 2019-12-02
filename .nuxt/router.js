import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8e9f3694 = () => interopDefault(import('../pages/collection.vue' /* webpackChunkName: "pages/collection" */))
const _0ddb05ff = () => interopDefault(import('../pages/collection/_collectionid.vue' /* webpackChunkName: "pages/collection/_collectionid" */))
const _7d73b92b = () => interopDefault(import('../pages/explore.vue' /* webpackChunkName: "pages/explore" */))
const _2bed0fea = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _571f6cd2 = () => interopDefault(import('../pages/_room.vue' /* webpackChunkName: "pages/_room" */))
const _44f0e456 = () => interopDefault(import('../pages/_room/index.vue' /* webpackChunkName: "pages/_room/index" */))
const _12cd26fd = () => interopDefault(import('../pages/_room/_product.vue' /* webpackChunkName: "pages/_room/_product" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/collection",
      component: _8e9f3694,
      name: "collection",
      children: [{
        path: ":collectionid?",
        component: _0ddb05ff,
        name: "collection-collectionid"
      }]
    }, {
      path: "/explore",
      component: _7d73b92b,
      name: "explore"
    }, {
      path: "/",
      component: _2bed0fea,
      name: "index"
    }, {
      path: "/:room",
      component: _571f6cd2,
      children: [{
        path: "",
        component: _44f0e456,
        name: "room"
      }, {
        path: ":product",
        component: _12cd26fd,
        name: "room-product"
      }]
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
