<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    hide-actions
    no-data-text="No item"
    dark
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.quantity }}</td>
      <td>{{ props.item.amount }}</td>
      <td>
        <v-icon small @click="deleteItem(props.item.name)">delete</v-icon>
      </td>
    </template>
    <template v-slot:footer v-if="$store.state.cartItem.length > 0">
      <td :colspan="headers.length -2">
        <strong class="text-xs-right d-block">Total Amount</strong>
      </td>
      <td>{{totalAmount}} MMK</td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "DataTable",
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true }
  },
  data() {
    return {};
  },
  computed:{
    totalAmount(){
      let total = 0
      this.$store.state.cartItem.forEach(item => total += item.amount)
      return total
    }
  },
  methods: {
    deleteItem(name) {
      let index = this.$store.state.cartItem.findIndex(
        item => item.name == name
      );
      let item = this.$store.state.cartItem[index];
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.$store.state.cartItem.splice(index, 1);
      }
      if (item.quantity > 0) {
        this.$store.state.cartItem.splice(index, 1, item);
      }
    }
  }
};
</script>