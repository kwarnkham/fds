<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs-12>
      <Login/>
      <!-- <Register/> -->
      <!-- <SnackBar/> -->
    </v-flex>
  </v-layout>
</template>

<script>
// import Register from "../components/Register";
import Login from "../components/Login";
// import SnackBar from '../components/SnackBar'

export default {
  name: "Home",
  components: {
    // Register,
    Login,
    // SnackBar
  }
};
</script>
