const { initializeApp } = require("firebase/app");
const { getStorage, ref } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyB-nEF7pJkkMSpqJkT4jNycYgQjWCOVBFs",
  authDomain: "vehicle-review-system.firebaseapp.com",
  projectId: "vehicle-review-system",
  storageBucket: "vehicle-review-system.appspot.com",
  messagingSenderId: "1082676741088",
  appId: "1:1082676741088:web:7a59c7ba31f84de65ae185",
};

const firebaseApp = initializeApp(firebaseConfig);

module.exports = getStorage(firebaseApp);