<template>
  <v-layout justify-space-between row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="teal lighten-3 title">Check Out</v-card-title>
        <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium autem facilis officia ea tenetur repellendus labore officiis natus hic veniam! Vero enim illo eaque! Placeat velit voluptate hic expedita cupiditate?</v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mx-3"
          v-if="$store.state.cartItem.length > 0"
        >
          <v-text-field v-model="name" :rules="nameRules" label="Name" required clearable></v-text-field>
          <v-text-field
            v-model="mobile"
            :rules="phoneRules"
            label="Phone"
            type="number"
            required
            clearable
            prefix="09"
          ></v-text-field>

          <v-textarea
            v-model="address"
            :rules="addressRules"
            label="Address"
            required
            clearable
            no-resize
            rows="2"
            validate-on-blur
          ></v-textarea>
          <v-textarea v-model="note" label="Note" clearable no-resize rows="2"></v-textarea>
        </v-form>

        <DataTable :headers="tableHeaders" :items="items"/>
        <v-card-actions v-if="items.length > 0">
          <v-btn
            flat
            depressed
            outline
            color="accent"
            v-if="!showMeal"
            @click="showMeal = !showMeal"
          >Show Meals</v-btn>
          <v-btn
            flat
            depressed
            outline
            color="grey lighten-1"
            v-if="showMeal"
            @click="showMeal = !showMeal"
          >Hide Meals</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            flat
            depressed
            outline
            color="success"
            @click="validate"
            :loading="isLoading"
            :disabled="isDisabled"
          >Submit Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-layout row justify-start wrap v-if="showMeal">
      <v-flex xs12 sm6 md4 v-for="meal in $store.state.cartItem" :key="meal.name">
        <MealComponent>
          <template v-slot:image>
            <v-img height="300px" :src="$store.state.baseUrl+meal.product_pictures[0].name" contain></v-img>
          </template>
          <template v-slot:title>
            <span>Name: {{meal.name}}</span>
          </template>
          <template v-slot:price>
            <p>Price: {{meal.price}} MMK</p>
          </template>
          <template v-slot:qty>
            <p>Quantity: {{meal.quantity}}</p>
          </template>

          <!-- <v-btn flat class="success" @click.native="addToCart(meal)">
          <v-icon>add_shopping_cart</v-icon>
          </v-btn>-->
          <!-- <v-spacer></v-spacer> -->
          <v-btn flat class="info" @click.native="showDetail(meal)">
            <v-icon>info</v-icon>
          </v-btn>
        </MealComponent>
      </v-flex>
    </v-layout>
    <FullScreenDialog ref="mealDetail">
      <MealDetail @closeFullScreenDialog="closeMealDetail"/>
    </FullScreenDialog>
  </v-layout>
</template>

<script>
import { mealComponentMixin } from "@/mixins/mealComponentMixin";
import { apiMixin } from "@/mixins/apiMixin";
import DataTable from "@/components/DataTable";
import MealComponent from "@/components/MealComponent";
import MealDetail from "../components/MealDetail";
import FullScreenDialog from "../components/FullScreenDialog";
export default {
  name: "Cart",
  components: {
    DataTable,
    MealComponent,
    MealDetail,
    FullScreenDialog
  },
  mixins: [mealComponentMixin, apiMixin],
  data: () => ({
    isLoading: false,
    tableHeaders: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Amount (MMK)", value: "amount" },
      { text: "Add", value: "name", sortable: false },
      { text: "Remove", value: "name", sortable: false }
    ],
    showMeal: false,
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    mobile: "",
    phoneRules: [
      v => !!v || "Phone is required",
      v =>
        (v && v.length >= 7 && v.length <= 9) ||
        "Mobile must be between 9 and 11 digits"
    ],
    address: "",
    addressRules: [v => !!v || "Address is required"],
    note: ""
  }),
  computed: {
    items() {
      return this.$store.state.cartItem;
    },
    isDisabled() {
      if (this.valid == false || this.isLoading == true) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    submit() {
      this.submitOrder(this.name, this.mobile, this.address, this.note);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.submit();
      }
    }
  }
};
</script>


