import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    token: null,
    toAddToCartMeal:{},
    cartItem:[],
    cartLayoutHack: true
  },
  mutations: {
    setToken: (state, payload) => {
      localStorage.setItem('token', payload)
      state.token = payload
    },
    removeToken: (state)=>{
      localStorage.removeItem('token');
      state.token = null
    },
    setToAddToCartMeal: (state, payload) =>{
      state.toAddToCartMeal=payload
    },
    addToCart: (state) =>{
      state.cartItem.push(state.toAddToCartMeal)
      state.toAddToCartMeal= {}
    },
    cartLayoutHack: (state) => {
      state.cartLayoutHack = false;
      state.cartLayoutHack = true;
    }
  },
  actions: {
    setToken: (context, payload) => {
      context.commit('setToken', payload)
    },
    removeToken:(context) => {
      context.commit('removeToken')
    },
    setToAddToCartMeal:(context, payload) => {
      context.commit('setToAddToCartMeal', payload)
    },
    addToCart:(context) => {
      context.commit('addToCart')
    },
    cartLayoutHack:(context) => {
      context.commit('cartLayoutHack')
    }
  }
})
