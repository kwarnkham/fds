<template>
  <v-layout align-center justify-center row wrap>
    <v-flex xs12 sm6 md4 v-for="meal in meals" :key="meal.name">
      <MealComponent>
        <template v-slot:image>
          <v-img height="300px" :src="meal.picture" contain></v-img>
        </template>
        <template v-slot:title>
          <span>{{meal.name}}</span>
        </template>
        <template v-slot:price>
          <span>{{meal.price}} MMK</span>
        </template>
        <v-btn flat class="success" @click.native="addToCart(meal)">
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat class="info" @click.native="showDetail(meal)">
          <v-icon>info</v-icon>
        </v-btn>
      </MealComponent>
    </v-flex>
    <!-- <FullScreenDialog ref="loginDialog">
      <LoginComponent v-if="$store.state.token == null"/>
    </FullScreenDialog> -->
    <FullScreenDialog ref="mealDetail">
      <MealDetail @closeFullScreenDialog="closeMealDetail"/>
    </FullScreenDialog>
  </v-layout>
</template>

<script>
import { mealComponentMixin } from "@/mixins/mealComponentMixin";
import MealComponent from "../components/MealComponent";
import MealDetail from "../components/MealDetail";
import FullScreenDialog from "../components/FullScreenDialog";
// import LoginComponent from "../components/LoginComponent";
// import ToAddToCart from "../components/ToAddToCart";

export default {
  name: "Meal",
  components: {
    MealComponent,
    MealDetail,
    FullScreenDialog,
    // LoginComponent,
    // ToAddToCart
  },
  mixins:[mealComponentMixin],
  data: () => ({
    meals: [
      { picture: require("@/assets/food1.jpg"), name: "food1", price: 1000 },
      { picture: require("@/assets/food2.jpg"), name: "food2", price: 1000 },
      { picture: require("@/assets/food3.jpg"), name: "food3", price: 1000 },
      { picture: require("@/assets/food4.jpg"), name: "food4", price: 1000 },
      { picture: require("@/assets/food5.jpg"), name: "food5", price: 1000 },
      { picture: require("@/assets/food6.jpg"), name: "food6", price: 1000 },
      { picture: require("@/assets/food7.jpg"), name: "food7", price: 1000 },
      { picture: require("@/assets/food8.jpg"), name: "food8", price: 1000 }
    ]
  }),
  computed: {
    // isLogin() {
    //   return this.$store.state.token == null ? false : true;
    // }
  },
  watch: {
    // isLogin(status) {
    //   if (status) {
    //     this.$refs.loginDialog.toggleDialog(false);
    //   }
    // }
  },
  methods: {
    addToCart(meal) {
      this.$store.dispatch("addToCart", meal);
    }
  }
};
</script>
