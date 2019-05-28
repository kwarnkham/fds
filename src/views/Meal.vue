<template>
  <v-layout align-center justify-center row wrap>
    <v-flex xs12 md6 v-for="meal in meals" :key="meal.name">
      <MealComponent>
        <template v-slot:image>
          <v-img height="300px" :src="meal.picture" contain></v-img>
        </template>
        <template v-slot:title>
          <span>{{meal.name}}</span>
        </template>
        <v-btn
          v-if="$store.state.token == null"
          depressed
          class="grey"
          @click.native="$refs.loginDialog.toggleDialog(true)"
        >Order</v-btn>
        <v-btn
          v-if="$store.state.token != null"
          depressed
          class="orange"
          @click.native="order"
        >Order</v-btn>
        <v-btn depressed color="info">Detail</v-btn>
      </MealComponent>
    </v-flex>

    <FullScreenDialog ref="loginDialog">
      <Login @openRegisterDialog="openRegisterDialog"/>
    </FullScreenDialog>
    <FullScreenDialog ref="registerDialog">
      <Register/>
    </FullScreenDialog>
  </v-layout>
</template>

<script>
import MealComponent from "../components/MealComponent";
import FullScreenDialog from "../components/FullScreenDialog";
import Register from "../components/Register";
import Login from "../components/Login";

export default {
  name: "Meal",
  components: {
    MealComponent,
    FullScreenDialog,
    Register,
    Login
  },
  data: () => ({
    meals: [
      { picture: require("@/assets/food1.jpg"), name: "food1" },
      { picture: require("@/assets/food2.jpg"), name: "food2" },
      { picture: require("@/assets/food3.jpg"), name: "food3" },
      { picture: require("@/assets/food4.jpg"), name: "food4" },
      { picture: require("@/assets/food5.jpg"), name: "food5" },
      { picture: require("@/assets/food6.jpg"), name: "food6" },
      { picture: require("@/assets/food7.jpg"), name: "food7" },
      { picture: require("@/assets/food8.jpg"), name: "food8" }
    ]
  }),
  methods: {
    openRegisterDialog() {
      // this.$refs.loginDialog.toggleDialog(false)
      this.$refs.registerDialog.toggleDialog(true);
    },
    order(){
      alert('ordering')
    }
  }
};
</script>
