const state = {
  email: "",
  restaurantId: ""
};
const mutations = {
  initUserStore(state, { email, restaurantId }) {
    state.email = email;
    state.restaurantId = restaurantId;
  }
};
const actions = {
  initUserData({ commit }, payload) {
    commit("initUserStore", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
