<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    lazy
    class="grey lighten-3"
  >
    <v-card style="height:100%;">
      <v-layout justify-center row wrap>
        <v-flex xs12 class="grey darken-3">
          <v-btn class="ma-0 grey darken-3" depressed block @click="dialog = false"><v-icon color="white">close</v-icon></v-btn>
        </v-flex>
        <v-flex xs12 md6>
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