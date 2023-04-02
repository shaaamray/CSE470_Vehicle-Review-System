// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-nEF7pJkkMSpqJkT4jNycYgQjWCOVBFs",
  authDomain: "vehicle-review-system.firebaseapp.com",
  projectId: "vehicle-review-system",
  storageBucket: "vehicle-review-system.appspot.com",
  messagingSenderId: "1082676741088",
  appId: "1:1082676741088:web:7a59c7ba31f84de65ae185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;