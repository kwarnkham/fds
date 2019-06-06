<template>
  <v-layout justify-center row fill-height>
    <v-flex xs12 md6>
      <AddProduct/>
    </v-flex>
  </v-layout>
</template>

<script>
import AddProduct from '@/components/AddProduct'
export default {
  name: "Home",
  components: {
    AddProduct
  }
};
</script>
