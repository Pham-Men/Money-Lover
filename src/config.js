import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBu0hSe7jvga1M4ZM1xOOUhZFAq2cM783Y",
    authDomain: "money-lover-8ed64.firebaseapp.com",
    projectId: "money-lover-8ed64",
    storageBucket: "money-lover-8ed64.appspot.com",
    messagingSenderId: "236004849862",
    appId: "1:236004849862:web:a9f177f55dc76b49ee7fc7",
    measurementId: "G-2PD7BKDX80"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)