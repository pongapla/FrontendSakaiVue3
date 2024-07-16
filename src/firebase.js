// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjyhBGSkJ2-W0q0SJJstAH8sRdH-UXsWQ",
  authDomain: "vue3login-28b62.firebaseapp.com",
  projectId: "vue3login-28b62",
  storageBucket: "vue3login-28b62.appspot.com",
  messagingSenderId: "832099664623",
  appId: "1:832099664623:web:9892f79499c54f9a53511a",
  measurementId: "G-Y912WZNPYB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, facebookProvider, appleProvider, signInWithRedirect };
