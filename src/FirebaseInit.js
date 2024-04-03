import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkYHwT4rS-wxzOzcn6sIvh6iUXIbthTrk",
  authDomain: "enschede-explorer-v3.firebaseapp.com",
  databaseURL: "https://enschede-explorer-v3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "enschede-explorer-v3",
  storageBucket: "enschede-explorer-v3.appspot.com",
  messagingSenderId: "715323519652",
  appId: "1:715323519652:web:56ce9fdd283a2100ed2c31",
  measurementId: "G-SSS8BJPSCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export {db, auth};
 