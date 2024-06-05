// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_HA7IRbisgg16DrzMsSOD_ypBLOibICY",
  authDomain: "seattle-museum-guide.firebaseapp.com",
  projectId: "seattle-museum-guide",
  storageBucket: "seattle-museum-guide.appspot.com",
  messagingSenderId: "547380325554",
  appId: "1:547380325554:web:2bee128b7d6460d3146dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };