<template>
  <v-layout row wrap justify-center align-content-start>
    <v-flex xs12 md7>
      <v-card>
        <v-card-title class="title">Order Tracking</v-card-title>
        <v-card-text>You need the order id and you phone number to track the order</v-card-text>
        <v-form ref="getOrderInfoForm" v-model="valid" lazy-validation class="mx-3">
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="orderId"
                :rules="[rules.required]"
                label="Order Id"
                type="number"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="mobile"
                :rules="[rules.required]"
                label="Phone Number"
                type="number"
                prefix="09"
                required
              ></v-text-field>
            </v-flex>
            <!-- <v-flex xs12 sm6> -->
            <v-btn depressed outline flat color="white">Dummy</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              outline
              flat
              color="info"
              @click="submit"
              :disabled="isDisabled"
              :loading="isLoading"
            >Submit</v-btn>
            <!-- </v-flex> -->
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 v-if="$store.state.trackedOrder != null" class="mt-3">
      <v-layout row wrap class="pl-3 grey darken-2 white--text">
        <v-flex xs12>
          Order ID :
          <strong>{{$store.state.trackedOrder.id}}</strong>
        </v-flex>
        <v-flex xs12>
          Order Status :
          <strong>{{$store.state.trackedOrder.status}}</strong>
        </v-flex>
        <v-flex xs12>
          Address To Deliver :
          <strong>{{$store.state.trackedOrder.address}}</strong>
        </v-flex>
      </v-layout>
      <DataTable :headers="tableHeaders" :items="items"/>
    </v-flex>
    <SnackBar ref="snackBar" @snackBarClosed="message=''">{{message}}</SnackBar>
  </v-layout>
</template>

<script>
import { apiMixin } from "../mixins/apiMixin";
import DataTable from "@/components/DataTable";
import SnackBar from "@/components/SnackBar";
export default {
  name: "OrderStatus",
  components: {
    DataTable,
    SnackBar
  },
  mixins: [apiMixin],
  data: () => ({
    message: "",
    isLoading: false,
    valid: false,
    orderId: "",
    mobile: "",
    rules: {
      required: value => !!value || "Required."
    },
    tableHeaders: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "quantity" },
      { text: "Amount (MMK)", value: "amount" }
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.getOrderInfoForm.validate()) {
        this.trackOrder(this.orderId, this.mobile);
      }
    }
  },
  computed: {
    isDisabled() {
      if (this.valid == false && this.isLoading == true) {
        return true;
      } else {
        return false;
      }
    },
    items() {
      return this.$store.getters.trackedOrderItems;
    }
  },
  mounted() {
    this.$route.query.order_id == undefined
      ? (this.orderId = "")
      : (this.orderId = this.$route.query.order_id);

    this.$route.query.mobile == undefined
      ? (this.mobile = "")
      : (this.mobile = this.$route.query.mobile);

    if (this.$route.query.order_id != undefined) {
      this.trackOrder(this.orderId, this.mobile);
    }

    this.$on("getOrderInfoResponse", (message, status) => {
      this.message = message;
      this.$refs.snackBar.toggleSnackBar(true, status);
    });
  }
};
</script>

<style scoped>
</style>





