<template>
  <v-layout row wrap>
    <v-flex xs12>
      <p class="display-1 text-xs-center">Order Management</p>
      <v-data-table :headers="headers" :items="orders" class="elevation-1" dark>
        <template v-slot:items="props">
          <td>
            <v-btn
              icon
              class="primary"
              @click.native="showOrderDetail(props.item.id)"
            >{{ props.item.id }}</v-btn>
          </td>
          <td>{{ props.item.status }}</td>
          <!-- confirm -->
          <td>
            <v-btn
              icon
              class="info"
              :disabled="disableConfirm(props.item.status)"
              @click.native="confirmOrder(props.item.id)"
            >
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <!-- deliver -->
          <td>
            <v-btn
              icon
              class="teal"
              @click.native="deliverOrder(props.item.id)"
              :disabled="disableDeliver(props.item.status)"
            >
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <!-- cancel -->
          <td>
            <v-btn
              icon
              class="error"
              :disabled="disableCancel(props.item.status)"
              @click.native="cancelOrder(props.item.id)"
            >
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <!-- complete -->
          <td>
            <v-btn
              icon
              class="success"
              :disabled="disableComplete(props.item.status)"
              @click.native="cancelOrder(props.item.id)"
            >
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <FullScreenDialog ref="FullScreenDialog">
      <v-layout row wrap v-if="Object.keys(order).length > 0">
        <v-flex xs12>
          <v-card class="mt-5">
            <v-card-title>
              <p class="display-1">Order Details</p>
            </v-card-title>
            <v-card-text>
              <p>Order Id: {{order.id}}</p>
              <p>User: {{order.user.name}}</p>
              <p>Phone: 09-{{order.mobile}}</p>
              <p>Address: {{order.address}}</p>
              <p>Amount: {{order.amount}} MMK</p>
              <p>Status: {{order.status}}</p>
              <p>Client Note: {{order.note}}</p>
              <p>Admin Note: {{order.admin_note}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 v-for="meal in order.products" :key="meal.name">
          <MealComponent>
            <template v-slot:image>
              <v-img
                height="300px"
                :src="$store.state.baseUrl+meal.product_pictures[0].name"
                contain
              ></v-img>
            </template>
            <template v-slot:title>
              <span>{{meal.name}}</span>
            </template>
            <template v-slot:price>
              <span>{{meal.price}} MMK</span>
            </template>
            <v-spacer></v-spacer>
            <v-btn flat class="info" @click.native="showDetail(meal)">
              <v-icon>info</v-icon>
            </v-btn>
          </MealComponent>
        </v-flex>
      </v-layout>
    </FullScreenDialog>
    <FullScreenDialog ref="mealDetail">
      <MealDetail @closeFullScreenDialog="closeMealDetail"/>
    </FullScreenDialog>
    <Loading ref="loading"/>
  </v-layout>
</template>

<script>
import { apiMixin } from "@/mixins/apiMixin";
import { mealComponentMixin } from "@/mixins/mealComponentMixin";
import FullScreenDialog from "@/components/FullScreenDialog";
import MealComponent from "../components/MealComponent";
import MealDetail from "../components/MealDetail";
import Loading from "../components/Loading";
export default {
  name: "OrderManagement",
  mixins: [apiMixin, mealComponentMixin],
  components: {
    FullScreenDialog,
    MealComponent,
    MealDetail,
    Loading
  },
  data() {
    return {
      headers: [
        {
          text: "Order ID",
          align: "left",
          value: "id"
        },
        { text: "Status", value: "status" },
        { text: "Confirm", value: "id", sortable: false },
        { text: "Deliver", value: "id", sortable: false },
        { text: "Cancel", value: "id", sortable: false },
        { text: "Complete", value: "id", sortable: false }
      ],
      order: {}
    };
  },
  computed: {
    orders() {
      return this.$store.state.allOrders;
    }
  },
  methods: {
    disableConfirm(status) {
      if (status != "unconfirmed") {
        return true;
      } else {
        return false;
      }
    },
    disableDeliver(status) {
      if (status != "confirmed") {
        return true;
      } else {
        return false;
      }
    },
    disableCancel(status) {
      if (status == "canceled" || status == "completed") {
        return true;
      } else {
        return false;
      }
    },
    disableComplete(status) {
      if (status != "delivered") {
        return true;
      } else {
        return false;
      }
    },
    showOrderDetail(id) {
      this.$refs.FullScreenDialog.toggleDialog(true);
      this.getAnOrder(id);
    },
    confirmOrder(id) {
      this.updateOrder(id, "confirm");
    },
    deliverOrder(id) {
      this.updateOrder(id, "deliver");
    },
    cancelOrder(id) {
      this.updateOrder(id, "cancel");
    },
    completeOrder(id) {
      this.updateOrder(id, "complete");
    }
  },
  created() {
    this.getAllOrders();
  }
};
</script>
