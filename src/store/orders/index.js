import Vue from "vue";
import { get } from "../../utils/http.provider";

const state = {
  fetched: false,
  allOrders: [],
  selectedOrder: {}
};
const mutations = {
  setAllOrders(state, orders) {
    state.fetched = true;
    state.allOrders = orders;
  },
  toggleState(state, payload) {
    const index = state.allOrders.indexOf(payload.order);
    Vue.set(state.allOrders[index], "isNew", payload.isNew);
  },
  setSelectedOrder(state, order) {
    state.selectedOrder = order;
  },
  addNewOrder(state, newOrder) {
    state.allOrders = [newOrder, ...state.allOrders];
  }
};
const actions = {
  fetchAllOrders(context) {
    return new Promise(resolve => {
      get("/orders").then(x => {
        const orders = x
          .map(orderItem => {
            orderItem.createDate = new Date(orderItem.createDate);
            return orderItem;
          })
          .sort((a, b) => b.createDate - a.createDate);
        context.commit("setAllOrders", orders);
        resolve();
      });
    });
  },
  toggleOrderState({ commit }, payload) {
    commit("toggleState", payload);
  },
  selectOrder({ commit }, order) {
    commit("toggleState", { order, isNew: false });
    commit("setSelectedOrder", order);
  },
  addOrder({ commit }, newOrder) {
    commit("addNewOrder", newOrder);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
