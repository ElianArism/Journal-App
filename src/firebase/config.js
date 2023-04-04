import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBSEQ0yK7aJr24LXEy_N2fbSIJHbkGp7us",
  authDomain: "react-course-e729b.firebaseapp.com",
  projectId: "react-course-e729b",
  storageBucket: "react-course-e729b.appspot.com",
  messagingSenderId: "73743118445",
  appId: "1:73743118445:web:454a2857a9243084930f64",
};

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const FirestoreDB = getFirestore(FirebaseApp);

export { FirebaseApp, FirebaseAuth, FirestoreDB };
