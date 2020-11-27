import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAT4_E5D7jxTZIVq7ZI1YYGQFIo4-2vA0Q",
  authDomain: "seven-seven-tracker.firebaseapp.com",
  databaseURL: "https://seven-seven-tracker.firebaseio.com",
  projectId: "seven-seven-tracker",
  storageBucket: "seven-seven-tracker.appspot.com",
  messagingSenderId: "284043023795",
  appId: "1:284043023795:web:21b9a165a895507046e7c6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
