<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs-12>
      <LoginComponent v-if="$store.state.token == null"/>
      <!-- <Register/> -->
      <!-- <SnackBar/> -->
    </v-flex>
  </v-layout>
</template>

<script>
// import Register from "../components/Register";
import LoginComponent from "../components/LoginComponent";
// import SnackBar from '../components/SnackBar'

export default {
  name: "Login",
  components: {
    // Register,
    LoginComponent,
    // SnackBar
  }
};
</script>
