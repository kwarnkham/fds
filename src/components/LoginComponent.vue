<template>
  <v-layout row justify-center>
    <v-flex xs12 lg4>
      <v-card class="green lighten-5 ma-2">
        <span class="display-1 font-italic font-weight-light text-xs-center d-block pt-3">Login</span>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
          <v-text-field
            v-model="mobile"
            :rules="mobileRules"
            label="Mobile"
            type="number"
            required
            prepend-inner-icon="smartphone"
            box
            clearable
            prefix="09"
            outline
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-outer-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append-outer="showPassword = !showPassword"
            required
            clearable
            box
            prepend-inner-icon="lock"
            color="deep-purple darken-2"
            outline
          ></v-text-field>
          <div class="d-flex">
            <v-btn :disabled="!valid" color="success" @click="login">Login</v-btn>
            <v-btn color="primary" @click="$emit('openRegisterDialog')">Register</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-flex>
    <FullScreenDialog ref="registerDialog">
      <Register/>
    </FullScreenDialog>
    <SnackBar ref="snackBar" @snackBarClosed='message=""'>{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import axios from "axios";
import Register from "./Register";
import FullScreenDialog from "./FullScreenDialog";
import SnackBar from "./SnackBar";
export default {
  name: "LoginComponent",
  components: {
    Register,
    FullScreenDialog,
    SnackBar
  },
  data: () => ({
    valid: true,
    mobile: "",
    mobileRules: [
      v => !!v || "Mobile number is required",
      v =>
        (v && v.length >= 7 && v.length <= 9) ||
        "Mobile must be between 9 and 11 digits"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    showPassword: false,
    message: ""
  }),
  computed: {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: `${this.$store.state.apiBaseUrl}/api_token/create`,
          data: {
            mobile: this.mobile,
            password: this.password
          }
        })
          .then(res => {
            console.log(res);
            this.message= res.data.message;
            this.$refs.snackBar.toggleSnackBar(true, "success");
            this.$store.dispatch("setToken", res.data.token);
          })
          .catch(err => {
            console.log(err.response);
            for (let key in err.response.data.errors) {
              this.message += ` ${err.response.data.errors[key]}`;
              this.$refs.snackBar.toggleSnackBar(true, "error");
            }
          });
      }
    }
  },
  mounted() {
    this.$on("openRegisterDialog", () => {
      this.$refs.registerDialog.toggleDialog(true);
    });
    // this.login();
  }
};
</script>

