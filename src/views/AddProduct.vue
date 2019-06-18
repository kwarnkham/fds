<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card class="blue lighten-5 ma-2">
        <span
          class="display-1 font-italic font-weight-light text-xs-center d-block pt-3"
        >Add Product</span>
        <v-form ref="addProductForm" v-model="valid" lazy-validation class="pa-3">
          <v-text-field
            autofocus
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Name"
            required
            box
            clearable
            prepend-inner-icon="fastfood"
            outline
          ></v-text-field>

          <v-text-field
            v-model="price"
            :rules="priceRules"
            label="Price"
            required
            box
            clearable
            prepend-inner-icon="attach_money"
            outline
            type="number"
          ></v-text-field>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            label="Description"
            required
            box
            clearable
            prepend-inner-icon="info"
            outline
            no-resize
            rows="2"
          ></v-textarea>

          <FileInput @uploadImage="handleImage($event)"/>
          <v-layout row wrap justify-center align-center>
            <v-flex xs12 lg5 v-for="image in images" :key="image[0]" class="pa-2">
              <div style="text-align: end;">
                <v-btn icon color="red" class="d-inline" @click.native="removeUploadImage(image)">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>

              <v-img alt="image" :height="300" contain :src="image[1]"/>
            </v-flex>
          </v-layout>
          <v-btn
            :disabled="isDisabled"
            color="primary"
            @click="validate()"
            block
            :loading="isLoading"
          >Add</v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FileInput from "@/components/FileInput";
import { apiMixin } from "@/mixins/apiMixin";
import { setInterval } from "timers";
export default {
  name: "AddProduct",
  components: {
    FileInput
  },
  mixins: [apiMixin],
  data: () => ({
    valid: null,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v =>
        (v && v.length >= 4 && v.length <= 20) ||
        "Name must be between 4 and 20 characters"
    ],
    price: "",
    priceRules: [v => !!v || "Price is required"],
    description: "",
    descriptionRules: [v => !!v || "Description is required"],
    message: "",
    isLoading: false,
    files: [],
    images: []
  }),
  computed: {
    isDisabled() {
      if (this.valid == false || this.isLoading == true) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    files(v) {
      this.images = [];
      if (v.length > 0) {
        v.forEach(file => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = reader =>
            this.images.push([file.name, reader.target.result]);
        });
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.addProductForm.validate()) {
        this.addProduct(this.name, this.price, this.description, this.files);
      }
    },
    handleImage(e) {
      this.files = Array.from(e.target.files);
    },
    removeUploadImage(image) {
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i].name == image[0]) {
          this.files.splice(i, 1);
        }
      }
    }
  },
  mounted() {

  }
};
</script>

<style>
</style>
