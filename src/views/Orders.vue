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
              :key="item.orderNumber"
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
</v-layout>
        
</template>

<script>
// import Vue from "vue";
import { mapState, mapActions } from "vuex";
import moment from "moment";
import crypto from "crypto";
import * as firebase from "firebase";

export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    ...mapActions("orders", [
      "fetchAllOrders",
      "toggleOrderState",
      "selectOrder"
    ]),
    orderDate(dateValue) {
      const orderDate = moment(dateValue);
      const today = moment();
      const diff = today.diff(orderDate, "days");
      return diff > 1
        ? orderDate.format("MM/DD/YYYY hh:mm A")
        : orderDate.fromNow();
    },
    initFirebase() {
      const hash = crypto
        .createHash("md5")
        .update("melih@tdsmaker.com")
        .digest("hex");

      var rootRef = firebase
        .database()
        .ref("listeners_test/58b207f15138672ad0f3b84d/" + hash + "/orders");

      // rootRef.on("child_added", function(snapshot) {
      rootRef.on("value", snapshot => {
        const data = snapshot.val();
        let orders = [...this.allOrders];

        if (Object.keys(data).length > 0) {
          const audio = new Audio("/sounds/tone.mp3");
          // audio.loop = true;
          audio.play();
        }

        Object.values(data).forEach(order => {
          let relatedOrder = orders.find(x => x._id === order._id);
          if (relatedOrder && relatedOrder.isNew === undefined) {
            this.toggleOrderState({ order: relatedOrder, isNew: true });
          } else {
            order.isNew = true;
            orders = [order, ...orders];
          }
        });

        // this.orders = [...orders];
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
      this.$router.push("/order-details");
    }
  },
  mounted() {
    if (!this.fetched) {
      this.fetchAllOrders().then(() => {
        this.initFirebase();
      });
    } else {
      this.initFirebase();
    }
  },
  computed: {
    ...mapState("orders", ["fetched", "allOrders"])
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
