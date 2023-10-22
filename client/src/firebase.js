// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mcity-vet.firebaseapp.com",
  projectId: "mcity-vet",
  storageBucket: "mcity-vet.appspot.com",
  messagingSenderId: "326279764840",
  appId: "1:326279764840:web:78e60946ed23e032b514dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);