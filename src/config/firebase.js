// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHBxmQflkbXybYeJxYhta3kQJdw8uKDHs",
  authDomain: "zehealth-7c28c.firebaseapp.com",
  projectId: "zehealth-7c28c",
  storageBucket: "zehealth-7c28c.appspot.com",
  messagingSenderId: "304648684774",
  appId: "1:304648684774:web:07f292e7813cbf4a5be727",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
