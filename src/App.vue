<template>
  <v-app>
      <v-content>
        <component v-bind:is="layout"></component>
      </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import AuthorizedLayout from "./layouts/authorized.layout";
import NonAuthorizedLayout from "./layouts/nonauthorized.layout";
import Loading from "./views/Loading.vue";
import { initRoute } from "./utils/firebase.helper";

const default_layout = "authorized";

export default {
  data() {
    return {
      isLoaded: false
    };
  },
  computed: {
    layout() {
      if (!this.isLoaded) {
        return "loading";
      }
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  components: {
    "authorized-layout": AuthorizedLayout,
    "nonauthorized-layout": NonAuthorizedLayout,
    loading: Loading
  },
  methods: {
    ...mapActions("user", ["initUserData"]),
    loadApp() {
      const email = localStorage.getItem("mf-email");
      const restaurantId = localStorage.getItem("mf-resId");
      const auth = localStorage.getItem("mf-auth");

      if (auth && restaurantId && email) {
        //Check authorized ping
        this.initUserData({ email, restaurantId });
        initRoute(restaurantId, email);
      }

      this.isLoaded = true;
    }
  },
  mounted() {
    this.loadApp();
  }
};
</script>
