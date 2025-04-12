import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUVCNSv3xWghRmN1EBPO4LAxmoYElszeY",
  authDomain: "fablook-bec3d.firebaseapp.com",
  projectId: "fablook-bec3d",
  storageBucket: "fablook-bec3d.firebasestorage.app",
  messagingSenderId: "963419341803",
  appId: "1:963419341803:web:6aed91c085cf950f5f8fae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);