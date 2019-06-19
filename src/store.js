import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    baseUrl: 'http://127.0.0.1:8000/',
    token: null,
    mealDetail: {},
    cartItem: [],
    allMeals: [],
    trackedOrder: null
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
      if (state.cartItem.findIndex(order => order.name == payload.name) != -1) {
        let index = state.cartItem.findIndex(order => order.name == payload.name);
        let quantity = state.cartItem[index].quantity + 1;
        payload.quantity = quantity
        payload.amount = payload.quantity * payload.price
        state.cartItem.splice(index, 1, payload);
      }
      if (state.cartItem.findIndex(order => order.name == payload.name) == -1) {
        payload.quantity = 1;
        payload.amount = payload.quantity * payload.price;
        state.cartItem.push(payload);
      }
      state.mealDetail = {}
    },
    setAllMeals: (state, payload) => {
      state.allMeals = payload
    },
    setTrackedOrder: (state, payload) => {
      state.trackedOrder = payload
    },
    clearCart: (state) => {
      state.cartItem = []
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
    }
  }
})
