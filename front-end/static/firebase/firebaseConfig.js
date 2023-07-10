// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDKmDBQ6xroi-k_Jl_ok5GmfqshDvOVKog",
   authDomain: "task-master-42453.firebaseapp.com",
   projectId: "task-master-42453",
   storageBucket: "task-master-42453.appspot.com",
   messagingSenderId: "700928094482",
   appId: "1:700928094482:web:9e02678c6b2e3ccd4283cb",
   measurementId: "G-T7MQ22PGJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make Firestore accessible in the browser console
window.db = db;
window.app = app;
