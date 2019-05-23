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
          <v-btn flat color="orange">Order</v-btn>
          <v-btn flat color="orange">Detail</v-btn>
        </MealComponent>
      </v-flex>
    </v-layout>
</template>

<script>
import MealComponent from "../components/MealComponent";

export default {
  name: "Meal",
  components: {
    MealComponent
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
      { picture: require("@/assets/food8.jpg"), name: "food8" },
    ]
  })
};
</script>
