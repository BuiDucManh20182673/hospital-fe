// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { RecaptchaVerifier, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJkL3ckpKHcwKchiv5mTCBmJO2bb0931U",
  authDomain: "hospital-dcf21.firebaseapp.com",
  projectId: "hospital-dcf21",
  storageBucket: "hospital-dcf21.appspot.com",
  messagingSenderId: "540487967654",
  appId: "1:540487967654:web:c01d580d00c785b251a567",
  measurementId: "G-B86CMXXEGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = "vn";

export { auth };
