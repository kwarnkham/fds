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
        <!-- <v-btn
          v-if="$store.state.token == null"
          depressed
          class="grey"
          @click.native="$refs.loginDialog.toggleDialog(true)"
        >Order</v-btn>-->
        <v-btn
          v-if="$store.state.token == null"
          depressed
          class="grey"
          @click.native="order(meal)"
        >Order</v-btn>
        <!-- <v-btn v-if="$store.state.token != null" depressed class="orange" @click="order">Order</v-btn> -->
        <v-btn depressed color="info">Detail</v-btn>
      </MealComponent>
    </v-flex>
    <FullScreenDialog ref="loginDialog">
      <LoginComponent v-if="$store.state.token == null"/>
    </FullScreenDialog>
    <FullScreenDialog ref="orderDialog">
      <PhoneOrder />
    </FullScreenDialog>
  </v-layout>
</template>

<script>
import MealComponent from "../components/MealComponent";
import FullScreenDialog from "../components/FullScreenDialog";
import LoginComponent from "../components/LoginComponent";
import PhoneOrder from "../components/PhoneOrder";

export default {
  name: "Meal",
  components: {
    MealComponent,
    FullScreenDialog,
    LoginComponent,
    PhoneOrder
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
  computed: {
    isLogin() {
      return this.$store.state.token == null ? false : true;
    }
  },
  watch: {
    isLogin(status) {
      if (status) {
        this.$refs.loginDialog.toggleDialog(false);
      }
    }
  },
  methods: {
    order(meal) {
      this.$refs.orderDialog.toggleDialog(true);
      this.$store.dispatch('setCurrentOrderingMeal', meal)
    }
  }
};
</script>
