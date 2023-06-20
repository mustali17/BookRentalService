import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAik4-IVb4tTeH2Y4EzT0sE1feVWJVyJVQ",
  authDomain: "rentnread-e352c.firebaseapp.com",
  projectId: "rentnread-e352c",
  storageBucket: "rentnread-e352c.appspot.com",
  messagingSenderId: "189587809023",
  appId: "1:189587809023:web:0b9015132b739ed05622ca",
  measurementId: "G-EFZDZEEJTE",
});

export const auth = app.auth();
export default app;
export const storage = getStorage(app, "gs://rentnread-e352c.appspot.com");
