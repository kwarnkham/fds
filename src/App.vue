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
    //   axios({
    //     method: "post",
    //     url: `${this.$store.state.apiBaseUrl}/user/create`,
    //     data: {
    //       name: "Moon",
    //       mobile: "095088369",
    //       password: "ninjasaga",
    //       password_confirmation: "ninjasaga"
    //     }
    //   })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err.response));
  }
};
</script>

