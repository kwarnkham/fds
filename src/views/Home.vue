<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs-12>
      <Login/>
      <Register/>
    </v-flex>
  </v-layout>
</template>

<script>
import Register from "../components/Register";
import Login from "../components/Login";

export default {
  name: "Home",
  components: {
    Register,
    Login
  }
};
</script>
