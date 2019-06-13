<template>
  <v-layout>
    <v-flex xs12>
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
  </v-layout>
</template>

<script>
import { apiMixin } from "../mixins/apiMixin";
export default {
  name: "OrderStatus",
  mixins: [apiMixin],
  data: () => ({
    isLoading: false,
    valid: false,
    orderId: "",
    mobile: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    submit() {
      if (this.$refs.getOrderInfoForm.validate()) {
        this.getOrderInfo(this.orderId, this.mobile);
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
    }
  },
  mounted() {
    this.$route.query.order_id == undefined
      ? (this.orderId = "")
      : (this.orderId = this.$route.query.order_id);

    this.$route.query.mobile == undefined
      ? (this.mobile = "")
      : (this.mobile = this.$route.query.mobile);
  }
};
</script>




