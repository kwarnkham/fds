<template>
  <v-card class="blue lighten-5 ma-2">
    <span class="display-1 font-italic font-weight-light text-xs-center d-block pt-3">Add Product</span>
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
        autofocus
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

      <v-text-field
        autofocus
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        required
        box
        clearable
        prepend-inner-icon="info"
        outline
        type="text"
      ></v-text-field>

      <FileInput/>

      <v-btn
        :disabled="isDisabled"
        color="primary"
        @click="validate()"
        block
        :loading="isLoading"
      >Add</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import FileInput from "./FileInput";
export default {
  name: "AddProduct",
  components: {
    FileInput
  },
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
    isLoading: false
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
      if (this.$refs.regForm.validate()) {
      }
    }
  }
};
</script>

<style>
</style>
