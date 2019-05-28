import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    // isLogin: false,
    token: null
  },
  mutations: {
    // toggleIsLogin: (state, payload) => {
    //   state.isLogin = payload
    // },
    setToken: (state, payload) => {
      state.token = payload
      localStorage.setItem('token', payload)
    }
  },
  actions: {
    // toggleIsLogin: (context, payload) => {
    //   context.commit('toggleIsLogin', payload)
    // },
    setToken: (context, payload) => {
      context.commit('setToken', payload)
    },
  }
})
