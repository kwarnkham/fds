<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card color="green lighten-5">
      <v-card-text><slot>Yes or No</slot></v-card-text>
      <v-card-actions>
        <v-btn color="warning" flat @click="dialog = false">No</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="warning" flat @click="$emit('Agreed')">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name:'PromptDialog',
  data() {
    return {
      dialog: false
    };
  },
  methods:{
    toggleDialog(status){
      this.dialog= status
    }
  }
};
</script>