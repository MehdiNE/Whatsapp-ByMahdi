import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTo6xKlnqFoUUtdI0EKqG51-ADx6WICMk",
  authDomain: "whatsapp-bymahdi.firebaseapp.com",
  projectId: "whatsapp-bymahdi",
  storageBucket: "whatsapp-bymahdi.appspot.com",
  messagingSenderId: "197374692515",
  appId: "1:197374692515:web:3035b6e847d673abd14316",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};
