<template>
 <v-layout justify-center align-center>
  <v-progress-circular
        :size="50"
        color="primary"
        indeterminate v-if="!fetched"
      ></v-progress-circular>
      <v-list v-if="allOrders.length > 0" two-line style="width:100%">
          <template v-for="(item, index) in allOrders">
            <v-list-tile
              :key="item._id"
              avatar
              ripple
              @click="viewDetails(item)"
              v-bind:style="getStyle(item)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.user.name}}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.orderNumber }}</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.userAddress">{{ item.userAddress.googleFormatted }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ orderDate(item.orderDate) }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ `$${item.orderTotal.toFixed(2)}` }}</v-list-tile-action-text>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < allOrders.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
    <order-details-dialog v-bind:dialog="dialog" v-bind:on-close="closeDialog" />

</v-layout>
        
</template>

<script>
// import Vue from "vue";
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { listenNewOrders, removeData } from "../utils/firebase.helper";
import OrderDetailsDialog from "../components/OrderDetailsDialog.vue";

export default {
  data() {
    return {
      isLoading: true,
      dialog: false
    };
  },
  components: {
    "order-details-dialog": OrderDetailsDialog
  },
  methods: {
    ...mapActions("orders", [
      "fetchAllOrders",
      "toggleOrderState",
      "selectOrder",
      "addOrder"
    ]),
    ...mapActions("audio", ["initAudioPlay", "playAudio", "stopAudio"]),
    orderDate(dateValue) {
      const orderDate = moment(dateValue);
      const today = moment();
      const diff = today.diff(orderDate, "days");
      return diff > 1
        ? orderDate.format("MM/DD/YYYY hh:mm A")
        : orderDate.fromNow();
    },
    initListeners() {
      const listener = listenNewOrders(this.restaurantId, this.email);
      this.initAudioPlay();
      listener.on("new_order", newOrder => {
        newOrder.isNew = true;
        this.addOrder(newOrder);
        this.playAudio();
      });
    },
    getStyle(item) {
      var styleObject = {
        backgroundColor: item.isNew ? "#C8E6C9" : "#FFF"
      };
      return styleObject;
    },
    viewDetails(item) {
      this.selectOrder(item);
      this.stopAudio();
      this.dialog = true;
      removeData(this.restaurantId, this.email)(item._id);
    },
    closeDialog() {
      this.dialog = false;
    }
  },
  mounted() {
    if (!this.fetched) {
      this.fetchAllOrders().then(() => {
        this.initListeners();
      });
    } else {
      this.initListeners();
    }
  },
  computed: {
    ...mapState("orders", ["fetched", "allOrders"]),
    ...mapState("user", ["email", "restaurantId"])
  }
};
</script>
<style>
.v-list--two-line .v-list__tile {
  height: 100px;
}
.v-list {
  padding: 0px;
}
</style>
