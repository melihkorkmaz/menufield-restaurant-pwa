import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignIn from "./views/SignIn.vue";
import Orders from "./views/Orders.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    },
    {
      path: "/signin",
      name: "about",
      meta: { layout: "nonauthorized" },
      component: SignIn
    }
  ]
});
