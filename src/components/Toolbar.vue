<template>
  <v-toolbar :app="app" clipped-left>
    <v-toolbar-side-icon @click.stop="$emit('toggleNav')"></v-toolbar-side-icon>
    <v-toolbar-title>Food Delivery</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-badge left @click.native="$router.push('/cart')">
      <template v-slot:badge>
        <span>{{$store.state.cartItem.length}}</span>
      </template>
      <v-icon>shopping_cart</v-icon>
    </v-badge>
  </v-toolbar>
</template>

<script>
export default {
    name:'Toolbar',
    data:()=>({

    }),
    computed:{
      app(){
        return this.$store.state.cartLayoutHack
      }
    }
};
</script>


