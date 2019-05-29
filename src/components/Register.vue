<template>
  <v-layout row justify-center>
    <v-flex xs12 lg4>
      <v-card class="blue lighten-5 ma-2">
        <span
          class="display-1 font-italic font-weight-light text-xs-center d-block pt-3"
        >Registraion</span>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
          <v-text-field
            autofocus
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Name"
            required
            box
            clearable
            prepend-inner-icon="account_circle"
            outline
          ></v-text-field>

          <v-text-field
            v-model="mobile"
            :rules="mobileRules"
            label="Mobile"
            type="number"
            required
            prepend-inner-icon="smartphone"
            box
            clearable
            outline
            prefix="09"
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
          <v-text-field
            v-model="passwordConfirmation"
            :rules="passwordConfirmationRules"
            label="Password Confirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            :append-outer-icon="showPasswordConfirmation ? 'visibility' : 'visibility_off'"
            @click:append-outer="showPasswordConfirmation = !showPasswordConfirmation"
            required
            clearable
            box
            prepend-inner-icon="lock"
            color="deep-purple darken-2"
            outline
          ></v-text-field>
          <v-btn :disabled="!valid" color="primary" @click="register(name,mobile,password,passwordConfirmation)" block>Register</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <SnackBar ref="snackBar" @snackBarClosed='message=""'>{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import SnackBar from "./SnackBar";
import {apiMixin} from "../mixins/apiMixin"
export default {
  name: "Register",
  components: {
    SnackBar
  },
  mixins:[apiMixin],
  data: () => ({
    // errors: new Errors(),
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 10 characters"
    ],
    mobile: "",
    mobileRules: [
      v => !!v || "Mobile number is required",
      v =>
        (v && v.length >= 7 && v.length <= 9) ||
        "Mobile must be between 9 and 11 digits"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.toString().length >= 5 && v.toString().length <= 20) ||
        "Password Length must be between 5 and 20 digits"
    ],
    passwordConfirmation: "",
    showPassword: false,
    showPasswordConfirmation: false,
    message: ""
  }),
  computed: {
    passwordConfirmationRules() {
      return [
        v => !!v || "Password is required",
        v => (v && v == this.password) || "Passwords do not match"
      ];
    }
  },
  methods: {

  },
  mounted() {
    this.$on('registerResponse', (message, status)=>{
      this.message = message;
      this.$refs.snackBar.toggleSnackBar(true, status);
    })
  }
};
</script>

