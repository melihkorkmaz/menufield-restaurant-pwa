const firebase = require("firebase");

const sampleData = {
  _id: "33331",
  paymentTransactionResult: {
    messages: {
      resultCode: "Ok",
      message: [
        {
          code: "I00001",
          text: "Successful."
        }
      ]
    },
    transactionResponse: {
      responseCode: "1",
      authCode: "065438",
      avsResultCode: "P",
      cvvResultCode: "M",
      cavvResultCode: "",
      transId: "40256447083",
      refTransID: "",
      transHash: "54A5AFDF23CACEAFB943C144738F6CF3",
      testRequest: "0",
      accountNumber: "XXXX7370",
      accountType: "Visa",
      messages: {
        message: [
          {
            code: "1",
            description: "This transaction has been approved."
          }
        ]
      },
      transHashSha2: ""
    }
  },
  userBasket: [
    {
      note: "",
      description: "White pizza topped with BBQ grilled chicken",
      name: "BBQ Chicken Pizza",
      group: {
        order: 6,
        name: "Gourmet Pizzas",
        _id: "58c425d0350a80face698d3e"
      },
      items: [
        {
          order: 0,
          selectedPrice: 12.99,
          selectedName: "Medium ($12.99)",
          model: {
            title: "Size",
            value: 12.99,
            name: "Medium ($12.99)",
            id: "medium"
          },
          type: "Size"
        },
        {
          order: 1,
          model: {
            name: "Crust Options",
            selected: {
              name: "Thin Crust",
              price: 0,
              order: 1
            },
            key: "crust-options",
            type: "selectlist"
          },
          selectedPrice: 0,
          selectedName: "Thin Crust",
          type: "Crust Options"
        },
        {
          order: 2,
          selections: [
            {
              model: {
                priceList: [
                  {
                    name: "Small",
                    value: 0.99,
                    parentPrice: "small"
                  },
                  {
                    name: "Medium",
                    value: 1.79,
                    parentPrice: "medium"
                  },
                  {
                    name: "Large",
                    value: 2.49,
                    parentPrice: "large"
                  }
                ],
                name: "Bacon",
                selected: true,
                type: "checkbox"
              },
              selectedPrice: 1.79,
              selectedName: "Bacon"
            }
          ],
          type: "Additional Topping for Whole Pizza"
        }
      ],
      totalPrice: 14.780000000000001,
      quantity: "1"
    },
    {
      note: "",
      description:
        "(Hot, Mild, BBQ) served with celery, carrots & bleu cheese dressing on side.",
      name: "Boneless Buffalo Wings (10 pcs)",
      group: {
        order: 1,
        name: "Appetizers",
        _id: "58bb3037350a80face698cdd"
      },
      items: [
        {
          order: 2,
          model: {
            name: "Wing Sauce",
            selected: {
              name: "BBQ",
              value: "BBQ",
              price: 0,
              order: 3
            },
            key: "wing-sauce",
            type: "selectlist"
          },
          selectedPrice: 0,
          selectedName: "BBQ",
          type: "Wing Sauce"
        }
      ],
      totalPrice: 13.98,
      quantity: 2
    },
    {
      note: "",
      description: "With bacon and cheddar cheese with sour cream on the side.",
      name: "Potato Skin",
      group: {
        order: 1,
        name: "Appetizers",
        _id: "58bb3037350a80face698cdd"
      },
      items: [],
      totalPrice: 6.49,
      quantity: "1"
    },
    {
      note: "",
      description: "",
      name: "Tiramisu",
      group: {
        order: 20,
        name: "Desserts",
        _id: "58c4272d350a80face698d4c"
      },
      items: [],
      totalPrice: 7.98,
      quantity: 2
    }
  ],
  status: 1,
  userAddress: {
    dateCreated: "2017-08-16T22:08:25.325Z",
    dateModified: "2017-08-16T22:08:25.325Z",
    __v: 0,
    note: "room 319",
    zip: "06460",
    city: "Milford",
    addressLine: "50 Rowe Ave",
    googleFormatted: "50 Rowe Ave, Milford, CT 06460, USA",
    title: "Springhill Suites",
    phone: "7742818037",
    email: "ericpupek@gmail.com",
    province: "CT",
    lng: -73.09080699999998,
    lat: 41.211865,
    userId: "auth0|5994c1d7b926a8773813f567",
    _id: "5994c259d85a9033fc3908f7"
  },
  grandTotal: 50.98,
  orderTotal: 45.98,
  tip: 5,
  paymentMethod: "online",
  deliveryCharge: 0,
  tax: 2.75,
  subTotal: 43.23,
  createDate: "2017-08-16T22:09:22.355Z",
  user: {
    name: "ericpupek@gmail.com",
    picture:
      "https://s.gravatar.com/avatar/c80085c6d6c0a3f69a81d87edb395208?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png",
    providerId: "auth0|5994c1d7b926a8773813f567",
    email: "ericpupek@gmail.com"
  },
  orderDate: "2017-08-16T22:54:22.353Z",
  checkoutType: "delivery",
  orderTimeMethod: "now",
  orderNumber: "238RPFMK",
  userId: "auth0|5994c1d7b926a8773813f567",
  restaurantId: "58b207f15138672ad0f3b84d",
  creditCard: {
    holderName: "eric pupek",
    cardNumber: "40**-****-****-**70"
  },
  __v: 0
};

var fbConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "menu-field.firebaseapp.com",
  databaseURL: "https://menu-field.firebaseio.com",
  projectId: "menu-field",
  storageBucket: "menu-field.appspot.com",
  messagingSenderId: process.env.MESSAGE_SENDER_IP
};
firebase.initializeApp(fbConfig);

var rootRef = firebase
  .database()
  .ref(
    "/listeners_test/58b207f15138672ad0f3b84d/e8561e55cd5297e53f94f4dc07321e3c/orders/33331"
  );
rootRef.set(sampleData);

// setTimeout(function() {
//   console.log("times_out");
// }, 2000);
