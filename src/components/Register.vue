<template>
  <v-layout row justify-center>
    <v-flex xs12 lg4>
      <v-card class="blue lighten-5 ma-2">
        <span
          class="display-1 font-italic font-weight-light text-xs-center d-block pt-3"
        >Registraion</span>
        <v-form ref="regForm" v-model="valid" lazy-validation class="pa-3">
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

          <v-btn
            :disabled="isDisabled"
            color="primary"
            @click="validate()"
            block
            :loading="isLoading"
          >Register</v-btn>
          
        </v-form>
      </v-card>
    </v-flex>
    <SnackBar ref="snackBar" @snackBarClosed="clearMessage">{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import SnackBar from "./SnackBar";
import { apiMixin } from "../mixins/apiMixin";
export default {
  name: "Register",
  components: {
    SnackBar
  },
  mixins: [apiMixin],
  data: () => ({
    // errors: new Errors(),
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 4 && v.length <= 20) || "Name must be between 4 and 20 characters"
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
    message: "",
    isLoading: false
  }),
  computed: {
    passwordConfirmationRules() {
      return [
        v => !!v || "Password is required",
        v => (v && v == this.password) || "Passwords do not match"
      ];
    },
    isDisabled() {
      if (this.valid == false || this.isLoading == true) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = "";
    },
    validate() {
      if (this.$refs.regForm.validate()) {
        this.register(
          this.name,
          this.mobile,
          this.password,
          this.passwordConfirmation
        );
      }
    }
  },
  mounted() {
    this.$on("registerResponse", (message, status) => {
      this.message = message;
      this.$refs.snackBar.toggleSnackBar(true, status);
    });

    // this.$refs.regForm.reset();
  }
};
</script>

