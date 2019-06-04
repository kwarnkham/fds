<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs-12>
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
