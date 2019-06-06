<template>
  <v-layout wrap v-if="$store.state.cartItem.length">
    <v-flex xs12>
      <p class="display-1 text-xs-center mt-3">Check Out</p>
    </v-flex>
    <v-flex xs12>
      <v-data-table :headers="tableHeaders" :items="$store.state.cartItem">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>1000 MMK</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Cart",
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
  },
  mounted(){
    this.$store.dispatch('cartLayoutHack');
  }
};
</script>

<style scoped>
.flex {
  border-bottom: 1px solid silver;
  border-left: 1px solid silver;
}
</style>

