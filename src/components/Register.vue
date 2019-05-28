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
          <v-btn :disabled="!valid" color="primary" @click="register" block>Register</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <SnackBar ref="snackBar" @snackBarClosed='message=""'>{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import axios from "axios";
import SnackBar from "./SnackBar";
export default {
  name: "Register",
  components: {
    SnackBar
  },
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
    register() {
      if (this.$refs.form.validate()) {
        axios({
          method: "post",
          url: `${this.$store.state.apiBaseUrl}/user/create`,
          data: {
            name: this.name,
            mobile: this.mobile,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          }
        })
          .then(res => {
            // console.log(res);
            if (res.status == "200") {
              this.message = "Registraion is successful";
              this.$refs.snackBar.toggleSnackBar(true, "success");
              // this.$refs.form.reset();
              this.$store.dispatch("setToken", res.data.token);
            }
          })
          .catch(err => {
            console.log(err)
            for (let key in err.response.data.errors) {
              this.message += ` ${err.response.data.errors[key]}`;
            }
            this.$refs.snackBar.toggleSnackBar(true, "error");
          });
      }
    }
  },
  created() {

  }
};
</script>

