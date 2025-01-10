import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWYmWLvpxG3EUOC9QYApYIm27YGzRyl3o",
  authDomain: "word-bomb-a23fd.firebaseapp.com",
  projectId: "word-bomb-a23fd",
  storageBucket: "word-bomb-a23fd.firebasestorage.app",
  messagingSenderId: "165336897223",
  appId: "1:165336897223:web:7cbef7d6b6c8d1e6a1d0e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
