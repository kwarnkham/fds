<template>
  <v-card class="ma-2">
    <!-- <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img> -->
    <slot name="image"></slot>
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-actions class="d-flex" align-content-space-between>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name:'MealComponent'
};
</script>