<template>
  <v-layout justify-center row fill-height>
    <v-flex xs12>
      <AddOrder/>
    </v-flex>
  </v-layout>
</template>

<script>
import AddOrder from '@/components/AddOrder'
export default {
  name: "Home",
  components: {
    AddOrder
  },
  data:()=>({})
};
</script>
