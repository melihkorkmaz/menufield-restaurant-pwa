import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import "./registerServiceWorker";

Vue.use(Vuetify);

var fbConfig = {
  apiKey: "AIzaSyAlstqbGZjsDSy__6sM2ZUV3lGe8UEtg58",
  authDomain: "menu-field.firebaseapp.com",
  databaseURL: "https://menu-field.firebaseio.com",
  projectId: "menu-field",
  storageBucket: "menu-field.appspot.com",
  messagingSenderId: "531651691827"
};
firebase.initializeApp(fbConfig);
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("CONNECTEDD");
  } else {
    console.log("NOT CONNECTED");
  }
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
