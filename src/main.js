import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import "./registerServiceWorker";

Vue.use(Vuetify);

var fbConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "menu-field.firebaseapp.com",
  databaseURL: "https://menu-field.firebaseio.com",
  projectId: "menu-field",
  storageBucket: "menu-field.appspot.com",
  messagingSenderId: process.env.MESSAGE_SENDER_IP
};
firebase.initializeApp(fbConfig);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
