<template>
  <v-layout row wrap>
    <v-flex>
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

          <td>
            <v-btn icon class="info">
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon class="teal">
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon class="error">
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon class="success">
              <v-icon>play_for_work</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { apiMixin } from "@/mixins/apiMixin";
export default {
  name: "OrderManagement",
  mixins: [apiMixin],
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
      order: []
    };
  },
  computed: {
    orders() {
      return this.$store.state.allOrders;
    }
  },
  methods: {
    showOrderDetail(id) {
      this.getAnOrder(id);
    }
  },
  created() {
    this.getAllOrders();
  }
};
</script>
