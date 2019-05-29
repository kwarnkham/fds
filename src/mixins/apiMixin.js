const axios = require('axios')
import store from '../store'
axios.defaults.baseURL = store.state.apiBaseUrl;
axios.defaults.headers.common['Authorization'] = "Bearer " + store.state.token;
export const apiMixin = {
    methods: {
        //register
        register(name, mobile, password, passwordConfirmation) {
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
                });

        },
        //login
        login(mobile, password) {
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
                });
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
        }
    }
}