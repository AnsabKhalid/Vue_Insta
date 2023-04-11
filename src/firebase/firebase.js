import firebase from "firebase";
import "firebase/firestore";
// import { ref, onUnmounted } from "vue";

const connfig = {
  apiKey: "AIzaSyA6L6tm0KEZFt1HdYVTzVW-Q18B0i_sPys",
  authDomain: "clone-db-ccff9.firebaseapp.com",
  projectId: "clone-db-ccff9",
  storageBucket: "clone-db-ccff9.appspot.com",
  messagingSenderId: "76106361455",
  appId: "1:76106361455:web:d12d131cafa94d9a5c7b9a",
  measurementId: "G-S6G7PY04LY",
};
firebase.initializeApp(connfig);

const projfirestore = firebase.firestore();
export { projfirestore };
