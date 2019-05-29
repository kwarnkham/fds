<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs-12>
      <!-- <Login/>
      <Register/>-->
      <!-- <SnackBar/> -->
      <p v-show="$store.state.token != null">You are logged in</p>
      <p v-show="$store.state.token == null">You are not logged in</p>
    </v-flex>
  </v-layout>
</template>

<script>
import {apiMixin} from '../mixins/apiMixin'
// import Register from "../components/Register";
// import Login from "../components/Login";
// import SnackBar from '../components/SnackBar'

export default {
  name: "Logout",
  mixins:[apiMixin],
  components: {
    // Register,
    // Login,
    // SnackBar
  },
  methods: {

  },
  mounted() {
    this.logout();
  }
};
</script>
