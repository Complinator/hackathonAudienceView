// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGVHrQ_P6FSW7rqgAfRbhGZ_cFjKSy500",
  authDomain: "proyectoderma-c62d6.firebaseapp.com",
  projectId: "proyectoderma-c62d6",
  storageBucket: "proyectoderma-c62d6.appspot.com",
  messagingSenderId: "104558653079",
  appId: "1:104558653079:web:c8a97b8abfd55f11f183d2",
  measurementId: "G-F2WPQJLE58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;