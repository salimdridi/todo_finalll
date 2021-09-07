import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBlOewo28-Kk_6IQZaYKAX3JEY4_1EQs7I",
  authDomain: "todo-cc3df.firebaseapp.com",
  projectId: "todo-cc3df",
  storageBucket: "todo-cc3df.appspot.com",
  messagingSenderId: "253558942143",
  appId: "1:253558942143:web:7a5812d6c9b4bb371c190a",
  measurementId: "G-YPF9PDJGL2"
});


const db = firebase.firestore();
const auth = app.auth();

export { db, auth }
export default app;