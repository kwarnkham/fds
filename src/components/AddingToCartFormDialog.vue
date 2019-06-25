<template>
  <v-dialog persistent v-model="showAddingToCartForm">
    <v-card>
      <v-card-text>
        <div class="blue lighten-5 px-3 mb-3">
          <span>
            Quantity
            <v-btn icon depressed color="primary" @click="updateQty('up')">{{addingMeal.quantity}}</v-btn>
          </span>
          <v-btn depressed flat color="accent" @click="updateQty('up')">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn
            depressed
            flat
            color="error"
            :disabled="addingMeal.quantity <= 1"
            @click="updateQty('down')"
          >
            <v-icon>remove</v-icon>
          </v-btn>
        </div>
        <v-textarea
          auto-grow
          background-color="blue lighten-5"
          clearable
          full-width
          placeholder="Note"
          v-model="addingMeal.note"
        ></v-textarea>
        <v-btn depressed flat @click="adding">Add</v-btn>
        <v-btn depressed flat @click="cancelAdding">Cancel</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddingToCartFormDialog",
  data: () => ({
    showAddingToCartForm: false,
    addingMeal: {}
  }),
  computed: {
    cartItem() {
      return this.$store.state.cartItem;
    },
    amount() {
      return this.addingMeal.quantity * this.addingMeal.price;
    }
  },
  methods: {
    updateQty(action) {
      if (action == "up") this.addingMeal.quantity++;
      if (action == "down") this.addingMeal.quantity--;
    },
    adding() {
      if (
        this.cartItem.findIndex(order => order.name == this.addingMeal.name) !=
        -1
      ) {
        let index = this.cartItem.findIndex(
          order => order.name == this.addingMeal.name
        );
        let quantity = this.cartItem[index].quantity + this.addingMeal.quantity;
        console.log(this.cartItem[index].quantity + "cart");
        console.log(this.addingMeal.quantity + "adding");
      }

      //new item to cart
      if (
        this.cartItem.findIndex(order => order.name == this.addingMeal.name) ==
        -1
      ) {
        this.addingMeal.amount = this.amount;
        this.$store.dispatch("addToCart", this.addingMeal);
      }

      this.showAddingToCartForm = false;

      this.addingMeal = {};
    },
    cancelAdding() {
      this.showAddingToCartForm = false;
      this.addingMeal = {};
    },
    toggleDialog(status, payload) {
      this.showAddingToCartForm = status;
      this.addingMeal = payload;
    }
  }
};
</script>

<style>
</style>
