import * as firebase from "firebase";
import EventEmitter from "events";
import { compose } from "ramda";
import { md5Hasher } from "./utils.helper";

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
  `listeners_test/${restaurantId}/${md5Hasher(email)}/orders`;

const firebaseRef = url => firebase.database().ref(url);

const rootListenerRef = compose(
  firebaseRef,
  rootListenerUrl
);

const listenNewOrders = (
  restaurantId = "58b207f15138672ad0f3b84d",
  email = "melih@tdsmaker.com"
) => new FirebaseDataListener(rootListenerRef(restaurantId, email));

export { listenNewOrders };
