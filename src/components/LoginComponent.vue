<template>
  <v-layout row justify-center>
    <v-flex xs12 lg4>
      <v-card class="green lighten-5 ma-2">
        <span class="display-1 font-italic font-weight-light text-xs-center d-block pt-3">Login</span>
        <v-form ref="loginForm" v-model="valid" lazy-validation class="pa-3">
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
            autofocus
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
            <v-btn
              :disabled="isDisabled"
              color="success"
              @click="validate"
              :loading="isLoading"
            >Login</v-btn>
            <v-btn color="primary" @click="$emit('openRegisterDialog')">Register</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-flex>
    <FullScreenDialog ref="registerDialog">
      <Register/>
    </FullScreenDialog>
    <SnackBar ref="snackBar" @snackBarClosed="message=''">{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import { apiMixin } from "../mixins/apiMixin";
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
  mixins: [apiMixin],
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
    message: "",
    isLoading: false
  }),
  computed: {
    isDisabled() {
      if (this.valid == false || this.isLoading == true) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.login(this.mobile, this.password);
      }
    }
  },
  mounted() {
    this.$on("openRegisterDialog", () => {
      this.$refs.registerDialog.toggleDialog(true);
    });
    this.$on("loginResponse", (message, status) => {
      this.message = message;
      this.$refs.snackBar.toggleSnackBar(true, status);
    });
  }
};
</script>

