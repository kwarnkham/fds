<template>
  <v-card class="ma-1 pt-3">
    <!-- <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img> -->
    <slot name="image" id="image"></slot>
    <v-card-title class="font-weight-bold title">
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text>
      <slot name="price"></slot>
      <slot name="qty"></slot>
    </v-card-text>
    <v-card-actions align-content-space-between>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name:'MealComponent'
};
</script>

