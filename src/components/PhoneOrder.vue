<template>
  <v-layout row justify-center algin-center>
    <v-flex xs12 md6>
      <v-card color="orange lighten-5">
        <v-card-title primary-title>
          <p class="text-xs-center font-weight-bold title">Phone Order</p>
        </v-card-title>
        <v-img height="300px" :src="$store.state.currentOrderingMeal.picture" contain></v-img>
        <v-card-text>
          <p>ID: 123</p>
          <p>Name: {{$store.state.currentOrderingMeal.name}}</p>
          <p>Price: 1000 MMK</p>
          <p class="font-weight-bold font-italic">Call the following phone to order with ID</p>
        </v-card-text>
        <v-card-actions>
          <v-btn outline color="success" block>
            <v-icon color="success" class="pr-2">phone</v-icon>09878667867
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "PhoneOrder",
  data: () => ({
    meal: {}
  }),
  methods: {
    setMeal(meal) {
      this.meal = meal;
    }
  }
};
</script>

<style>
</style>
