<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    lazy
    class="grey lighten-3"
  >
    <v-toolbar app flat class="white">
      <v-spacer></v-spacer>
      <v-btn class="ma-0 grey darken-3" depressed icon @click="dialog = false">
        <v-icon color="white">close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card style="height:100%;">
      <v-layout row wrap>
        <v-flex xs12>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FullScreenDialog",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    toggleDialog(status) {
      this.dialog = status;
    }
  }
};
</script>