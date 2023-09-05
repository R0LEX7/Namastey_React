
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwEBKBgJXDkL-NdnNNl1uCjX9vhyOdV_E",
  authDomain: "yummiee-6a93b.firebaseapp.com",
  projectId: "yummiee-6a93b",
  storageBucket: "yummiee-6a93b.appspot.com",
  messagingSenderId: "709573096583",
  appId: "1:709573096583:web:6894b8125b816a69eef422",
  measurementId: "G-8ZC9Y2RF0Z"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;