import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignIn from "./views/SignIn.vue";
import Orders from "./views/Orders.vue";
import OrderDetails from "./views/OrderDetails.vue";

Vue.use(Router);

const router = new Router({
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
      path: "/order-details",
      name: "orderDetails",
      component: OrderDetails
    },
    {
      path: "/signin",
      name: "about",
      meta: { layout: "nonauthorized" },
      component: SignIn
    }
  ]
});

router.beforeEach((to, from, next) => {
  const email = localStorage.getItem("mf-email");
  const restaurantId = localStorage.getItem("mf-resId");
  const auth = localStorage.getItem("mf-auth");
  if (to.meta["layout"] !== "nonauthorized") {
    if (!email || !restaurantId || !auth) {
      next({
        path: "/signin"
      });
    }
  }

  next();
});

export default router;
