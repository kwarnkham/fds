<template>
  <div>
    <v-navigation-drawer
      v-model="drawerToggler"
      absolute
      app
      disable-route-watcher
      disable-resize-watcher
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon :class="{activeColor:$route.path == item.to}">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              <a
                v-if="item.title == 'Logout'"
                href="#"
                @click.prevent="confirmLogout"
                :class="{activeColor:$route.path == item.to}"
              >{{ item.title }}</a>
              <PromptDialog ref="promptDialog" @Agreed="logout" v-if="item.title == 'Logout'">Do you really want to log out?</PromptDialog>
              <router-link
                v-if="item.title != 'Logout'"
                :to="item.to"
                @click.native.passive="drawerToggler = !drawerToggler"
                :class="{activeColor:$route.path == item.to}"
              >{{ item.title }}</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
          
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute>
      <v-toolbar-side-icon @click.stop="drawerToggler = !drawerToggler"></v-toolbar-side-icon>
      <v-toolbar-title>Food Delivery System</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import PromptDialog from "./PromptDialog";
export default {
  name: "NavComponent",
  components: {
    PromptDialog
  },
  data: () => ({
    drawerToggler: false,
    items: [
      { title: "Home", icon: "dashboard", to: "/" },
      { title: "Meal", icon: "question_answer", to: "/meal" }
    ]
  }),
  mounted() {
    // eslint-disable-next-line
    this.$on("input", () => (this.drawerToggler = !drawerToggler));
  },
  computed: {
    isLogin() {
      if (this.$store.state.token == null) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  watch: {
    isLogin(state) {
      if (state) {
        this.items[this.items.length - 1] = {
          title: "Logout",
          icon: "exit_to_app",
          to: "/logout"
        };
      }
      if (!state) {
        this.items[this.items.length - 1] = {
          title: "Login",
          icon: "person_outline",
          to: "/login"
        };
      }
    }
  },
  created() {
    this.items.push({ title: "Login", icon: "person_outline", to: "/login" });
  },
  methods: {
    confirmLogout() {
      this.$refs.promptDialog[0].toggleDialog(true);
    },
    logout() {
      this.$refs.promptDialog[0].toggleDialog(false);
      this.$router.push("/logout");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.activeColor {
  color: #2196f3;
}
</style>
