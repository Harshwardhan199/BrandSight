import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4H1185NP5Q-1QzzHKqY2DXADCM78uDRU",
  authDomain: "brandsight-49913.firebaseapp.com",
  projectId: "brandsight-49913",
  storageBucket: "brandsight-49913.firebasestorage.app",
  messagingSenderId: "1034587018099",
  appId: "1:1034587018099:web:bddbb8678abbff62d46b06"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);