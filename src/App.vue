<template>
  <v-app>
    <Toolbar @toggleNav="toggleNav"/>
    <Nav ref="nav"/>
    <v-content>
      <v-container fluid class="pa-0 grey lighten-2" fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

import Toolbar from "./components/Toolbar";
import Nav from "./components/Nav";
export default {
  name: "App",
  components: {
    Toolbar,
    Nav
  },
  methods:{
    toggleNav(){
      this.$refs.nav.toggleNav()
    }
  },
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.$store.dispatch("setToken", localStorage.getItem("token"));
    }
  }
};
</script>

