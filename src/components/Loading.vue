<template>
  <v-dialog v-model="dialog" full-width>
    <v-btn loading flat block class="yellow lighten-4"></v-btn>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    trigger(state) {
    //   console.log("loading");
      this.dialog = state;
    }
  }
};
</script>