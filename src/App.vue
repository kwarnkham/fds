<template>
  <v-app>
    <NavComponent/>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer :inset="true" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import axios from "axios";
import NavComponent from "./components/NavComponent";
export default {
  components: {
    NavComponent
  },
  mounted() {
    if(localStorage.getItem('token')!= null){
      this.$store.dispatch('setToken', localStorage.getItem('token'))
    }
  }
};
</script>

