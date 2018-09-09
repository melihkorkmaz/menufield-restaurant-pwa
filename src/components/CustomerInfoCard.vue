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
export default {
  props: ["order"],
  computed: {
    customerInfo() {
      const order = this.order;
      return [
        { label: "Name", value: order.user.name },
        {
          label: "Address",
          value: order.userAddress
            ? order.userAddress.googleFormatted || "-"
            : "-"
        },
        {
          label: "Address Note",
          value: order.userAddress ? order.userAddress.note || "-" : "-"
        },
        {
          label: "Phone",
          value: order.userAddress
            ? order.userAddress.phone || "-"
            : order.phone || "-"
        },
        {
          label: "Email",
          value: order.userAddress
            ? order.userAddress.email || "-"
            : order.user.email || "-"
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
