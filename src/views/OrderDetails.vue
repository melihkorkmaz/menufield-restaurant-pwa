<template>
    <div>
        Order Details - {{selectedOrder.orderNumber}}
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("orders", ["selectedOrder"])
  }
};
</script>
