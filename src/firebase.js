// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBenu_Tg1Kz3UhSiXtvb8_RoYUfvIevBsk",
  authDomain: "blog-eefa7.firebaseapp.com",
  projectId: "blog-eefa7",
  storageBucket: "blog-eefa7.appspot.com",
  messagingSenderId: "117411309468",
  appId: "1:117411309468:web:dc9a70f4316ec8484b0a59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
