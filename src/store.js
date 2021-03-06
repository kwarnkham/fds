import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    baseUrl: 'http://127.0.0.1:8000/',
    // apiBaseUrl: 'https://foodds.ml/api',
    // baseUrl: 'https://foodds.ml/',
    token: null,
    mealDetail: {},
    cartItem: [],
    allMeals: [],
    trackedOrder: null,
    allOrders: []
  },
  getters: {
    trackedOrderItems: state => {
      let items = [];
      if (state.trackedOrder != null) {
        state.trackedOrder.products.forEach(product => {
          let item = {};
          item.name = product.name
          item.price = product.price
          item.description = product.description
          item.quantity = product.pivot.quantity
          item.amount = product.price * product.pivot.quantity
          // item.address = state.trackedOrder.address
          // item.orderId = state.trackedOrder.id
          // item.orderStatus = state.trackedOrder.status
          // item.orderNote = state.trackedOrder.note
          items.push(item)
        })
      }
      return items;
    }
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
      //already existed
      if (state.cartItem.findIndex(order => order.id == payload.id) != -1) {
        let index = state.cartItem.findIndex(order => order.id == payload.id)
        state.cartItem.splice(index, 1, payload)
      }
      //new
      if (state.cartItem.findIndex(order => order.id == payload.id) == -1) {
        state.cartItem.push(Object.assign({}, payload));
      }
    },
    setAllMeals: (state, payload) => {
      state.allMeals = payload
    },
    setTrackedOrder: (state, payload) => {
      state.trackedOrder = payload
    },
    clearCart: (state) => {
      state.cartItem = []
    },
    setAllOrders: (state, payload) => {
      state.allOrders = payload
    }
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
      // console.log(payload)
      context.commit('addToCart', payload)
    },
    setAllMeals: (context, payload) => {
      context.commit('setAllMeals', payload)
    },
    setTrackedOrder: (context, payload) => {
      context.commit('setTrackedOrder', payload)
    },
    clearCart: (context) => {
      context.commit('clearCart')
    },
    setAllOrders: (context, payload) => {
      context.commit('setAllOrders', payload)
    }
  }
})
