import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    token: null,
    currentOrderingMeal:{}
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
    setCurrentOrderingMeal: (state, payload) =>{
      state.currentOrderingMeal=payload
    }
  },
  actions: {
    setToken: (context, payload) => {
      context.commit('setToken', payload)
    },
    removeToken:(context) => {
      context.commit('removeToken')
    },
    setCurrentOrderingMeal:(context, payload) => {
      context.commit('setCurrentOrderingMeal', payload)
    }
  }
})
