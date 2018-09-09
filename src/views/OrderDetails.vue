<template>
    <div>
        Order Details - {{selectedOrder.orderNumber}}
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("orders", ["selectedOrder"])
  },
  methods: {
    ...mapActions("audio", ["stopAudio"])
  },
  mounted() {
    console.log("mounted");
  }
};
</script>
