<template>
  <v-snackbar auto-height v-model="snackbar" bottom right :color="color">
    <slot>This is to show you something is happening and so you know what or how to react or our app is working</slot>
    <v-btn @click="snackbar = false" icon color="grey darken-4">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      color:'info'
    };
  },
  methods:{
      toggleSnackBar(state, color ='info'){
          this.snackbar= state
          this.color= color
      }
  }
};
</script>