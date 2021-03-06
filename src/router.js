import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import SignIn from "./views/SignIn.vue";
import Orders from "./views/Orders.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
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
