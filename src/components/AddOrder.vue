<template>
  <v-layout wrap>
    <v-flex xs12 md6 class="white">
      <p class="title text-xs-center my-3">Items in Order</p>

      <v-form ref="form" v-model="valid" lazy-validation class="mx-3">
        <v-text-field v-model="name" :rules="nameRules" label="Name" required clearable></v-text-field>
        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="Phone"
          type="number"
          required
          clearable
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

      <v-data-table
        :headers="headers"
        :items="orders"
        class="elevation-1"
        dark
        hide-actions
        no-data-text="No item"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.amount }}</td>
        </template>
        <template v-slot:footer>
          <td :colspan="headers.length -1">
            <strong class="text-xs-right d-block">Total Amount</strong>
          </td>
          <td>{{totalAmount}}</td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 md6 class="teal lighten-3">
      <p class="title text-xs-center my-3">Choose Products to add</p>
      <v-layout wrap>
        <v-flex xs12 md6 v-for="meal in meals" :key="meal.name">
          <MealComponent>
            <template v-slot:image>
              <v-img height="200px" :src="meal.picture" contain></v-img>
            </template>
            <template v-slot:title>
              <span>{{meal.name}}</span>
            </template>
            <template v-slot:price>
              <span>1000 MMK</span>
            </template>
            <v-btn
              v-if="$store.state.token == null"
              depressed
              class="success"
              @click.native="addOrder(meal)"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </MealComponent>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import MealComponent from "./MealComponent";
export default {
  name: "AddOrder",
  components: {
    MealComponent
  },
  data: () => ({
    meals: [
      { picture: require("@/assets/food1.jpg"), name: "food1" },
      { picture: require("@/assets/food2.jpg"), name: "food2" },
      { picture: require("@/assets/food3.jpg"), name: "food3" },
      { picture: require("@/assets/food4.jpg"), name: "food4" },
      { picture: require("@/assets/food5.jpg"), name: "food5" },
      { picture: require("@/assets/food6.jpg"), name: "food6" },
      { picture: require("@/assets/food7.jpg"), name: "food7" },
      { picture: require("@/assets/food8.jpg"), name: "food8" }
    ],
    orders: [],
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Amount", value: "amount" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        quantity: 159,
        price: 6.0
      }
    ],

    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    phone: "",
    phoneRules: [v => !!v || "Phone is required"],
    address: "",
    addressRules: [v => !!v || "Address is required"],
    note: ""
  }),
  computed: {
    totalAmount() {
      let total = 0;
      this.orders.forEach(order => (total += order.amount));
      return total
    }
  },
  methods: {
    addOrder(meal) {
      if (this.orders.findIndex(order => order.name == meal.name) != -1) {
        let index = this.orders.findIndex(order => order.name == meal.name);
        let quantity = this.orders[index].quantity + 1;
        meal.quantity = quantity;
        meal.price = 1000;
        meal.amount = meal.quantity * meal.price;
        this.orders.splice(index, 1, meal);
      }
      if (this.orders.findIndex(order => order.name == meal.name) == -1) {
        this.orders.push(meal);
        this.orders[this.orders.length - 1].quantity = 1;
        this.orders[this.orders.length - 1].price = 1000;
        this.orders[this.orders.length - 1].amount =
          this.orders[this.orders.length - 1].price *
          this.orders[this.orders.length - 1].quantity;
      }
    }
  }
};
</script>

<style scoped>
</style>

