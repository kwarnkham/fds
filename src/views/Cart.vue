<template>
  <v-layout justify-center row class="blue">
    <v-flex xs12 md6>
      <v-card class="mt-3">
        <v-card-title class="teal lighten-1 title">Check Out</v-card-title>
        <v-card-text class="pa-0">
          <DataTable/>
          <!-- <v-layout row align-center class="grey lighten-1 pa-1">
            <v-flex xs2>Remove</v-flex>
            <v-flex xs5>Name</v-flex>
            <v-flex xs2>Qty</v-flex>
            <v-flex xs3>Price MMK</v-flex>
          </v-layout>

          <v-layout row align-center v-for="(item,key) in $store.state.cartItem" :key="key">
            <v-flex xs2>
              <v-btn depressed small fab flat>
                <v-icon small color="red">close</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs5>{{item.name}}</v-flex>
            <v-flex xs2>1</v-flex>
            <v-flex xs3>1000</v-flex>
          </v-layout>

          <v-layout row align-center class="brown lighten-2 pa-2">
            <v-flex xs9 class="text-xs-right pr-4">Total</v-flex>
            <v-flex xs3>Total Price</v-flex>
          </v-layout>-->
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  name: "Cart",
  components: {
    DataTable
  },
  data: () => ({
    tableHeaders: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Price", value: "price" }
    ]
  }),
  computed: {
    items() {
      return this.$store.state.cartItem;
    }
  }
};
</script>

<style scoped>
.custom-bb {
  border-bottom: 2px solid silver;
}

.custom-by {
  border-bottom: 2px solid silver;
  border-top: 2px solid silver;
}
</style>

