<template>
  <v-form ref="form" v-model="valid" lazy-validation class="brown lighten-5 pa-3 rounded">
    <v-text-field
      autofocus
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
      box
      clearable
      prepend-inner-icon="account_circle"
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
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" @click="register" block>Register</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    mobile: "",
    mobileRules: [
      v => !!v || "Mobile number is required",
      v =>
        (v && v.length >= 9 && v.length <= 11) ||
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
    showPassword:false,
    showPasswordConfirmation:false
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
        alert("can do");
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 10%;
}
</style>
