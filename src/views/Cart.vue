<template>
  <v-layout justify-space-between row class="blue">
    <v-flex xs12>
      <v-card>
        <v-card-title class="teal lighten-3 title">Check Out</v-card-title>
        <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium autem facilis officia ea tenetur repellendus labore officiis natus hic veniam! Vero enim illo eaque! Placeat velit voluptate hic expedita cupiditate?</v-card-text>
        <DataTable :headers="tableHeaders"/>
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
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Amount", value: "amount" }
    ]
  }),
  computed: {
    items() {
      return this.$store.state.cartItem;
    }
  }
};
</script>


