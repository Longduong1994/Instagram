// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGy_A9XZmScd4osT-YxADrEjtsGFb3Sfk",
  authDomain: "instagam-clone-f1805.firebaseapp.com",
  projectId: "instagam-clone-f1805",
  storageBucket: "instagam-clone-f1805.appspot.com",
  messagingSenderId: "517113798293",
  appId: "1:517113798293:web:c74e9f888363cee442859c",
  measurementId: "G-T9DGVMBZW5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service 

export const storage = getStorage(app);
