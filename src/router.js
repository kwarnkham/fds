import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meal',
      name: 'meal',
      component: () => import(/* webpackChunkName: "meal" */ './views/Meal.vue')
    },
    // {
    //   path: '/logout',
    //   name: 'logout',
    //   component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue')
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    // },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue')
    },
    {
      path: '/order/status',
      name: 'orderStatus',
      component: () => import(/* webpackChunkName: "order_status" */ './views/OrderStatus.vue'),
    },
    {
      path: '/product/add',
      name: 'addProduct',
      component: () => import(/* webpackChunkName: "add_product" */ './views/AddProduct.vue'),
    },
    {
      path: '/order/manage',
      name: 'manageOrder',
      component: () => import(/* webpackChunkName: "manage_order" */ './views/OrderManagement.vue'),
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import(/* webpackChunkName: "meal" */ './views/Test.vue')
    // },
  ]
})
