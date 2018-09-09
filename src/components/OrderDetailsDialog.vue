<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="blue-grey darken-3">
        <v-btn icon dark v-on:click="onClose">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="this.selectedOrder.user">{{this.selectedOrder.user.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="dialog = false">Print</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <customer-info-card v-if="selectedOrder._id" v-bind:order="selectedOrder" />
        </v-flex>
        <v-flex xs12 lg6>
          <order-info-card v-if="selectedOrder._id" v-bind:order="selectedOrder" />
        </v-flex>
        <v-flex xs12>
          <order-items-card v-if="selectedOrder._id" v-bind:order="selectedOrder" />
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import CustomerInfoCard from "./CustomerInfoCard.vue";
import OrderInfoCard from "./OrderInfoCard.vue";
import OrderItemsCard from "./OrderItemsCard.vue";

export default {
  props: ["dialog", "onClose"],
  computed: {
    ...mapState("orders", ["selectedOrder"])
  },
  components: {
    "customer-info-card": CustomerInfoCard,
    "order-info-card": OrderInfoCard,
    "order-items-card": OrderItemsCard
  }
};
</script>
