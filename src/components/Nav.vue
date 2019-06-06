<template>
  <v-navigation-drawer v-model="drawerToggler" app clipped width="200">
    <v-list class="pt-0" dense>
      <v-divider light></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" class="mt-3">
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
            <PromptDialog
              ref="promptDialog"
              @Agreed="logout"
              v-if="item.title == 'Logout'"
            >Do you really want to log out?</PromptDialog>

            <router-link
              v-if="item.title != 'Logout'"
              :to="item.to"
              :class="{activeColor:$route.path == item.to}"
            >{{ item.title }}</router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Nav",
  data: () => ({
    drawerToggler: null,
    items: [
      { title: "Home", icon: "dashboard", to: "/" },
      { title: "Meal", icon: "question_answer", to: "/meal" },
      { title: "Checkout", icon: "shopping_cart", to: "/cart" }
    ]
  }),
  methods: {
    toggleNav() {
      this.drawerToggler = !this.drawerToggler;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: gray;
}
.activeColor {
  color: #2196f3;
}
</style>
