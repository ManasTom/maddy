const firebaseConfig = {
  apiKey: "AIzaSyDHWat27MvP7Oml5TSRVvejGXPFzT35S1I",
  authDomain: "uploadcheck-d6971.firebaseapp.com",
  databaseURL: "https://uploadcheck-d6971-default-rtdb.firebaseio.com",
  projectId: "uploadcheck-d6971",
  storageBucket: "uploadcheck-d6971.appspot.com",
  messagingSenderId: "515282333943",
  appId: "1:515282333943:web:b086b7d0e73fdb9e0c63f2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
import { getDatabase, ref, child, get, limitToLast } from "https://www.gstatic.com/firebasejs/9.x/firebase-database.js";
