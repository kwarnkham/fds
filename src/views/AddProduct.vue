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
            <v-flex xs12 lg5 v-for="image in images" :key="image" class="pa-2">
              <v-img alt="image" contain :src="image"/>
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
    images: [],
    files:''
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
  methods: {
    validate() {
      if (this.$refs.addProductForm.validate()) {
        this.addProduct(this.name, this.price, this.description, this.files);
      }
    },
    handleImage(e) {
      this.files= e.target.files
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

<style>
</style>
