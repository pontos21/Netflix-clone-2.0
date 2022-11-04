// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyByiFw1hFRwGx1tAodmuw3GzwcA8RRJs10",
    authDomain: "netflix-build-2-a522a.firebaseapp.com",
    projectId: "netflix-build-2-a522a",
    storageBucket: "netflix-build-2-a522a.appspot.com",
    messagingSenderId: "462625003138",
    appId: "1:462625003138:web:6878bb8722af654676469b"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;