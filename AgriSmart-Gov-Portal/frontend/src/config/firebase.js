import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYKrvHUvyh6L5Y7bWxZqHuYGjwsNSCrZM",
  authDomain: "agrismartfinal.firebaseapp.com",
  databaseURL: "https://agrismartfinal-default-rtdb.firebaseio.com",
  projectId: "agrismartfinal",
  storageBucket: "agrismartfinal.firebasestorage.app",
  messagingSenderId: "583584318964",
  appId: "1:583584318964:web:16850b877ce782a54825a1",
  measurementId: "G-73FV7DC2P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };