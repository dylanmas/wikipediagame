import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzMRbhfycZcramMGzcaTXZZtHHqI3-K8o",
  authDomain: "wikiroyale-5ffa6.firebaseapp.com",
  projectId: "wikiroyale-5ffa6",
  storageBucket: "wikiroyale-5ffa6.appspot.com",
  messagingSenderId: "655634975241",
  appId: "1:655634975241:web:c22550c6d944a1bb3186d8",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
