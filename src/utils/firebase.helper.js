import * as firebase from "firebase";
import EventEmitter from "events";
import { compose } from "ramda";
import { md5Hasher } from "./utils.helper";
const ROOT_LISTENER_NAME = "listeners";

class FirebaseDataListener extends EventEmitter {
  constructor(listener) {
    super();
    this.init(listener);
  }

  init(listener) {
    listener.on("child_added", snapshot => {
      this.emit("new_order", snapshot.val());
    });
  }
}

const rootListenerUrl = (restaurantId, email) =>
  `${ROOT_LISTENER_NAME}/${restaurantId}/${md5Hasher(email)}/orders`;

const firebaseRef = url => firebase.database().ref(url);

const rootListenerRef = compose(
  firebaseRef,
  rootListenerUrl
);

const listenNewOrders = (restaurantId, email) =>
  new FirebaseDataListener(rootListenerRef(restaurantId, email));

const removeData = (restaurantId, email) => id => {
  let routeUrl = rootListenerUrl(restaurantId, email);
  routeUrl += `/${id}`;
  firebase
    .database()
    .ref(routeUrl)
    .remove()
    .then(() => {});
};

const initRoute = (restaurantId, email) => {
  const routeUrl = `${ROOT_LISTENER_NAME}/${restaurantId}/${md5Hasher(email)}`;
  const ref = firebase.database().ref(routeUrl);
  ref.set({
    active: true,
    orders: []
  });
};

const destroyRoute = (restaurantId, email) => {
  const routeUrl = rootListenerUrl(restaurantId, email);
  firebase
    .database()
    .ref(routeUrl)
    .remove()
    .then(() => {});
};

export { listenNewOrders, removeData, initRoute, destroyRoute };
