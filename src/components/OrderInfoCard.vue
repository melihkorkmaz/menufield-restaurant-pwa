<template>
    <v-card class="ma-2">
            <v-form class="pa-3">
                <v-text-field v-for="item in customerInfo"
                v-bind:key="item.label"
                v-model="item.value"
                v-bind:label="item.label"
                readonly
                />
            </v-form>
    </v-card>

</template>

<script>
import { paymentMethod, checkoutType, orderTime } from "../utils/order.helper";
export default {
  props: ["order"],
  computed: {
    customerInfo() {
      const order = this.order;
      console.log("order", order);
      return [
        { label: "Type", value: checkoutType(order.carryOrDelivery) },
        { label: "Order Time", value: orderTime(order) },
        { label: "Payment", value: paymentMethod(order) },
        { label: "Credit Card", value: order.creditCard.cardNumber },
        {
          label: "Tip",
          value: order.tip.value
            ? `$${order.tip.value.toFixed(2)}`
            : `$${order.tip.toFixed(2)}`
        }
      ];
    }
  }
};
</script>

<style>
.v-text-field > .v-input__control > .v-input__slot:after,
.v-text-field > .v-input__control > .v-input__slot:before {
  display: none;
}
</style>
