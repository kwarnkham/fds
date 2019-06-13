const axios = require('axios')
import store from '../store'
axios.defaults.baseURL = store.state.apiBaseUrl;
axios.defaults.headers.common['Authorization'] = "Bearer " + store.state.token;
export const apiMixin = {
    methods: {
        //register
        register(name, mobile, password, passwordConfirmation) {
            this.isLoading = true
            axios({
                method: "post",
                url: `/user/create`,
                data: {
                    name: name,
                    mobile: mobile,
                    password: password,
                    password_confirmation: passwordConfirmation
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status == "200") {
                        this.$emit('registerResponse', res.data.message, 'success')
                        store.dispatch("setToken", res.data.token);
                    }
                })
                .catch(err => {
                    console.log(err.response)
                    let apiMessage = ''
                    for (let key in err.response.data.errors) {
                        apiMessage += ` ${err.response.data.errors[key]}`;
                    }
                    this.$emit('registerResponse', apiMessage, 'error')
                }).finally(() => this.isLoading = false);

        },
        //login
        login(mobile, password) {
            this.isLoading = true;
            axios({
                method: "post",
                url: `/api_token/create`,
                data: {
                    mobile: mobile,
                    password: password
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.token == undefined) {
                        this.$emit('loginResponse', res.data.message, 'error')
                    } else {
                        this.$emit('loginResponse', res.data.message, 'success')
                        store.dispatch("setToken", res.data.token);
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    let apiMessage = ''
                    for (let key in err.response.data.errors) {
                        apiMessage += ` ${err.response.data.errors[key]}`;
                    }
                    this.$emit('loginResponse', apiMessage, 'error')
                }).finally(() => this.isLoading = false);
        },
        //logout
        logout() {
            axios({
                method: "post",
                url: `/api_token/destroy`,
                headers: { 'Authorization': 'Bearer ' + store.state.token }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err.response);
                }).finally(() => {
                    store.dispatch("removeToken");
                    this.$router.push("/");
                });
        },
        //submitOrder
        submitOrder(name, mobile, address, note) {
            this.isLoading = true
            axios({
                method: "post",
                url: `/order/submit`,
                headers: { 'Authorization': 'Bearer ' + store.state.token },
                data: {
                    name: name,
                    mobile: mobile,
                    address: address,
                    note: note,
                    cartItem: store.state.cartItem
                }
            })
                .then(res => {
                    console.log(res);
                    this.$router.push(`/order/status?order_id=${res.data.order_id}&mobile=${mobile}`)
                })
                .catch(err => {
                    console.log(err.response);
                }).finally(() => {
                    this.isLoading = false
                });

        },

        //get order info
        getOrderInfo(orderId, mobile) {
            this.isLoading = true
            axios({
                method: "get",
                url: `/order`,
                headers: { 'Authorization': 'Bearer ' + store.state.token },
                params: {
                    order_id: orderId,
                    mobile: mobile,
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err.response);
                }).finally(() => {
                    this.isLoading = false
                });
        },

        //add product
        addProduct(name, price, description) {
            this.isLoading = true
            axios({
                method: "post",
                url: `/product/create`,
                headers: { 'Authorization': 'Bearer ' + store.state.token },
                data: {
                    name: name,
                    price: price,
                    description: description,
                    pictures: ''
                }
            })
                .then(res => {
                    console.log(res);
                    // this.$router.push(`/order/status?order_id=${res.data.order_id}&mobile=${mobile}`)
                })
                .catch(err => {
                    console.log(err.response);
                }).finally(() => {
                    this.isLoading = false
                });

        },
    }
}