// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHwwIbePj0mbdUNqAFoRmDQH_18AF7gg4",
    authDomain: "stockinsight-d07ea.firebaseapp.com",
    projectId: "stockinsight-d07ea",
    storageBucket: "stockinsight-d07ea.firebasestorage.app",
    messagingSenderId: "555315372171",
    appId: "1:555315372171:web:6c1f3f74651f494cf5748e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)