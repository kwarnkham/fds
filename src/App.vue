<template>
  <v-app :dark="dark">
    <NavComponent/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer :inset="true" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavComponent from "./components/NavComponent";
export default {
  components: {
    NavComponent
  },
  data: () => ({
    dark: true,
    drawerToggler: false,
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      mini: false
    }
  })
};
</script>