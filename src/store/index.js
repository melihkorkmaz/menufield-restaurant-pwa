import Vue from "vue";
import Vuex from "vuex";

import userModule from "./user";
import orderModule from "./orders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    orders: orderModule
  }
});
