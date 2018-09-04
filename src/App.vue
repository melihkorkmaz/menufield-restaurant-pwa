<template>
  <v-app>
      <v-content>
        <component v-bind:is="layout"></component>
      </v-content>
  </v-app>
</template>

<script>
import AuthorizedLayout from "./layouts/authorized.layout";
import NonAuthorizedLayout from "./layouts/nonauthorized.layout";

const default_layout = "authorized";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  components: {
    "authorized-layout": AuthorizedLayout,
    "nonauthorized-layout": NonAuthorizedLayout
  }
};
</script>
