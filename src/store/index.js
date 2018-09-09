import Vue from "vue";
import Vuex from "vuex";

import userModule from "./user";
import orderModule from "./orders";
import audioStore from "./audio.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    orders: orderModule,
    audio: audioStore
  }
});
