const firebaseConfig = {
  apiKey: "AIzaSyA3jdQrrMfETpynml4EVO00vgIYEGEi0jY",
  authDomain: "the-maddy.firebaseapp.com",
  databaseURL: "https://the-maddy-default-rtdb.firebaseio.com/",
  projectId: "the-maddy",
  storageBucket: "the-maddy.firebasestorage.app",
  messagingSenderId: "314970432448",
  appId: "1:314970432448:web:50ab70f77b403260211e25"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();

const db = firebase.database();