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
      // console.log(this.$refs.fileInput.files);
      // console.log(e);
      this.$emit('uploadImage', e)
    }
  }
};
</script>

<style scoped>
input[type="file"] {
  position: absolute;
  left: -99999px;
}
</style>

