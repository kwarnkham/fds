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
    addingMeal: {},
    addingQty: 1,
    addingNote: ""
  }),
  computed: {
    cartItem() {
      return this.$store.state.cartItem;
    },
    amount() {
      return this.addingQty * this.addingMeal.price;
    }
  },
  methods: {
    updateQty(action) {
      if (action == "up") {
        this.$set(this.addingMeal, "quantity", this.addingMeal.quantity + 1);
      }
      if (action == "down") {
        this.$set(this.addingMeal, "quantity", this.addingMeal.quantity - 1);
      }
    },

    adding() {
      this.$nextTick(() => {
        this.$set(
          this.addingMeal,
          "amount",
          this.addingMeal.price * this.addingMeal.quantity
        );
        console.log(this.addingMeal);
        this.$store.dispatch("addToCart", this.addingMeal);
        this.showAddingToCartForm = false;
      });
    },
    cancelAdding() {
      this.showAddingToCartForm = false;
      this.addingMeal = {};
      this.addingQty = 1;
      this.addingNote = "";
    },
    toggleDialog(status) {
      this.showAddingToCartForm = status;
    },
    setAddingMeal(meal) {
      //old
      if (this.cartItem.findIndex(order => order.id == meal.id) != -1) {
        let index = this.cartItem.findIndex(order => order.id == meal.id);
        this.addingMeal = Object.assign({}, this.cartItem[index]);
      }

      //new
      if (this.cartItem.findIndex(order => order.id == meal.id) == -1) {
        this.addingMeal = Object.assign({}, this.addingMeal, meal, {
          quantity: 1,
          note: ""
        });
      }

      // this.addingMeal = "Object.create(meal)";
    }
  }
};
</script>

<style>
</style>
