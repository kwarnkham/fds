import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    // token: null,
    mealDetail: {},
    cartItem: [],
  },
  mutations: {
    // setToken: (state, payload) => {
    //   localStorage.setItem('token', payload)
    //   state.token = payload
    // },
    // removeToken: (state) => {
    //   localStorage.removeItem('token');
    //   state.token = null
    // },
    setMealDetail: (state, payload) => {
      state.mealDetail = payload
    },
    addToCart: (state, payload) => {
      if (state.cartItem.findIndex(order => order.name == payload.name) != -1) {
        let index = state.cartItem.findIndex(order => order.name == payload.name);
        let quantity = state.cartItem[index].quantity + 1;
        payload.quantity = quantity
        payload.amount = payload.quantity * payload.price
        state.cartItem.splice(index, 1, payload);
      }
      if (state.cartItem.findIndex(order => order.name == payload.name) == -1) {
        payload.quantity= 1;
        payload.amount = payload.quantity * payload.price;
        state.cartItem.push(payload);
      }
      state.mealDetail = {}
    },
  },
  actions: {
    // setToken: (context, payload) => {
    //   context.commit('setToken', payload)
    // },
    // removeToken: (context) => {
    //   context.commit('removeToken')
    // },
    setMealDetail: (context, payload) => {
      context.commit('setMealDetail', payload)
    },
    addToCart: (context, payload) => {
      context.commit('addToCart', payload)
    },
  }
})
