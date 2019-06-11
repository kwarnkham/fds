<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon @click.stop="$emit('toggleNav')"></v-toolbar-side-icon>
    <v-toolbar-title>Food Delivery</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-badge left @click.native="$router.push('/cart')">
      <template v-slot:badge>
        <span>{{cartItemQty}}</span>
      </template>
      <v-icon>shopping_cart</v-icon>
    </v-badge>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data: () => ({}),
  computed: {
    cartItemQty(){
      let qty= 0
      this.$store.state.cartItem.forEach(item => qty += item.quantity)
      return qty
    }
  }
};
</script>
<style scoped>
.toolbar{
  z-index: 999;
}
</style>



