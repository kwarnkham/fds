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
    setToken: (state, payload) => {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    removeToken: (state)=>{
      state.token = null
    }
  },
  actions: {
    setToken: (context, payload) => {
      context.commit('setToken', payload)
    },
    removeToken:(context) => {
      context.commit('removeToken')
    }
  }
})
