<template>
  <!-- <v-layout row justify-center algin-center>
    <v-flex xs12 md6> -->
      <v-card color="orange lighten-5">
        <v-card-title primary-title>
          <p class="font-weight-bold title">Meal Details</p>
        </v-card-title>
        <v-img height="300px" :src="$store.state.mealDetail.picture" contain></v-img>
        <v-card-text>
          <p>Name: {{$store.state.mealDetail.name}}</p>
          <p>Price: {{$store.state.mealDetail.price}} MMK</p>
          <p>Description: This food is blah blah blah.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn outline color="success" block @click.native="addToCart">
            <v-icon color="success" class="pr-2">add_shopping_cart</v-icon>Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-flex>
  </v-layout> -->
</template>

<script>
export default {
  name: "MealDetail",
  data: () => ({}),
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.$store.state.mealDetail);
      this.$emit("closeFullScreenDialog");
    }
  }
};
</script>

<style>
</style>
