<template>
  <v-snackbar auto-height v-model="snackbar" bottom right :timeout="duration" :color="color">
    <slot>This is to show you something is happening and so you know what or how to react or our app is working</slot>
    <v-btn @click="snackbar = false" icon color="grey darken-4">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  name: "SnackBar",
  data() {
    return {
      snackbar: false,
      color: "info",
      duration: 6000
    };
  },
  watch: {
    snackbar(status) {
      if (status == false) {
        this.$emit("snackBarClosed");
      }
    }
  },
  methods: {
    toggleSnackBar(status, color = "info", duration = 6000) {
      this.snackbar = status;
      this.color = color;
      if (status == "error") {
        this.duration = 10000;
      } else {
        this.duration = duration;
      }
    }
  }
};
</script>