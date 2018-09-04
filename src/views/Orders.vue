<template>
        <v-list two-line style="width:100%">
          <template v-for="(item, index) in orders">
            <v-list-tile
              :key="item.orderNumber"
              avatar
              ripple
              @click="toggle(index)"
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
              v-if="index + 1 < orders.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
</template>

<script>
import moment from "moment";
import { get } from "../utils/http.provider";

export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    orderDate(dateValue) {
      const orderDate = moment(dateValue);
      const today = moment();
      const diff = today.diff(orderDate, "days");
      console.log("diff", diff > 1);
      return diff > 1
        ? orderDate.format("MM/DD/YYYY hh:mm A")
        : orderDate.fromNow();
    }
  },
  mounted() {
    get("/orders").then(x => {
      this.orders = x.sort((a, b) => a.createDate - b.createDate);
    });
  }
};
</script>
<style>
.v-list--two-line .v-list__tile {
  height: 100px;
}
</style>
