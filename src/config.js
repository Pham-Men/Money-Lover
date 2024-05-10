import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyBu0hSe7jvga1M4ZM1xOOUhZFAq2cM783Y",
    authDomain: "money-lover-8ed64.firebaseapp.com",
    projectId: "money-lover-8ed64",
    storageBucket: "money-lover-8ed64.appspot.com",
    messagingSenderId: "236004849862",
    appId: "1:236004849862:web:a9f177f55dc76b49ee7fc7",
    measurementId: "G-2PD7BKDX80"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const providerApple = new OAuthProvider("apple.com");
  

  export { app, db, auth, database, provider, providerApple};
 