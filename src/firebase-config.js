import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAW3rt7AVYoz0k0Xndzgg8cg2vIArwX460",
    authDomain: "kkgitapp.firebaseapp.com",
    projectId: "kkgitapp",
    storageBucket: "kkgitapp.appspot.com",
    messagingSenderId: "376221780440",
    appId: "1:376221780440:web:9cf321a5caa48e1eb48aad",
    measurementId: "G-C9X8QR6T95"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);