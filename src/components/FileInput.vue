<template>
  <div>
    <v-btn depressed color="blue lighten-2" ripple round @click.native="chooseToUpload">
      <slot>Add Pictures</slot>
    </v-btn>
    <input
      ref="fileInput"
      type="file"
      name="image"
      id="image"
      accept="image/*"
      multiple
      @change="uploadImage($event)"
    >
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 lg5 v-for="image in images" :key="image" class="pa-2">
        <v-img alt="image" contain :src="image"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "FileInput",
  data: () => ({
    images: []
  }),
  methods: {
    chooseToUpload() {
      this.$refs.fileInput.click();
    },
    uploadImage(e) {
      this.images = [];
      Array.from(e.target.files).forEach(image => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = reader => {
          this.images.push(reader.target.result);
        };
      });
    }
  }
};
</script>

<style <style scoped>
input[type="file"] {
  position: absolute;
  left: -99999px;
}
</style>

