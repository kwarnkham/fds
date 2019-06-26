<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 v-for="meal in meals" :key="meal.id">
      <MealComponent>
        <template v-slot:image>
          <v-img height="300px" :src="$store.state.baseUrl+meal.product_pictures[0].name" contain></v-img>
        </template>
        <template v-slot:title>
          <span>{{meal.name}}</span>
        </template>
        <template v-slot:price>
          <span>{{meal.price}} MMK</span>
        </template>
        <v-btn flat class="success" @click.stop="addToCart(meal)">
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat class="info" @click.native="showDetail(meal)">
          <v-icon>info</v-icon>
        </v-btn>
      </MealComponent>
    </v-flex>

    <FullScreenDialog ref="mealDetail">
      <MealDetail @closeFullScreenDialog="closeMealDetail"/>
    </FullScreenDialog>

    <!-- adding to cart -->
    <AddingToCartFormDialog ref="addingToCartFormDialog"/>
  </v-layout>
</template>

<script>
import { mealComponentMixin } from "@/mixins/mealComponentMixin";
import { apiMixin } from "@/mixins/apiMixin";
import MealComponent from "../components/MealComponent";
import MealDetail from "../components/MealDetail";
import FullScreenDialog from "../components/FullScreenDialog";
import AddingToCartFormDialog from "@/components/AddingToCartFormDialog";
// import LoginComponent from "../components/LoginComponent";
// import ToAddToCart from "../components/ToAddToCart";

export default {
  name: "Meal",
  components: {
    MealComponent,
    MealDetail,
    FullScreenDialog,
    AddingToCartFormDialog
    // LoginComponent,
    // ToAddToCart
  },
  mixins: [mealComponentMixin, apiMixin],
  data: () => ({}),
  computed: {
    // isLogin() {
    //   return this.$store.state.token == null ? false : true;
    // }
    meals() {
      return this.$store.state.allMeals;
    }
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
      this.$refs.addingToCartFormDialog.toggleDialog(true);
      this.$refs.addingToCartFormDialog.setAddingMeal(meal);
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
