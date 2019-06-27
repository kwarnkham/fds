<template>
  <v-layout row justify-center algin-center>
    <v-flex xs12 md6>
      <v-card color="orange lighten-5">
        <v-card-title primary-title>
          <p class="font-weight-bold title">Meal Details</p>
        </v-card-title>
        <v-carousel interval="3000">
          <v-carousel-item
            lazy
            v-for="( item ,i) in pictures"
            :key="i"
            :src="$store.state.baseUrl+item.name"
          ></v-carousel-item>
        </v-carousel>
        <v-card-text>
          <p>Name: {{$store.state.mealDetail.name}}</p>
          <p>Price: {{$store.state.mealDetail.price}} MMK</p>
          <p>Description: {{$store.state.mealDetail.description}}</p>
        </v-card-text>
        <v-card-actions v-if="$route.name != 'manageOrder'">
          <v-btn outline color="success" block @click.native="addToCart">
            <v-icon color="success" class="pr-2">add_shopping_cart</v-icon>Add to Cart
          </v-btn>
        </v-card-actions>
        <AddingToCartFormDialog ref="addingToCartFormDialog"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AddingToCartFormDialog from "@/components/AddingToCartFormDialog";
export default {
  name: "MealDetail",
  data: () => ({}),
  components: {
    AddingToCartFormDialog
  },
  computed: {
    pictures() {
      return this.$store.state.mealDetail.product_pictures;
    }
  },
  methods: {
    addToCart() {
      this.$refs.addingToCartFormDialog.toggleDialog(true);
      this.$refs.addingToCartFormDialog.setAddingMeal(
        this.$store.state.mealDetail
      );
      this.$emit("closeFullScreenDialog");
    }
  },
  created() {
    // console.log(this.$route.name)
  }
};
</script>

<style>
</style>
