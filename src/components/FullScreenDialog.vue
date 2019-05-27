<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" lazy class="grey lighten-3">
    <v-card style="height:100%;">
      <v-toolbar dark color="primary" app>
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>    
      </v-toolbar>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs-12>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  methods:{
      toggleDialog(state){
          this.dialog=state;
      }
  }
};
</script>