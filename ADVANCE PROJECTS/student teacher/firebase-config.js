 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyBJQgZHX419GvrMfjEnFRuetWz_s9ynrl8",
   authDomain: "my-first-project-f0e3b.firebaseapp.com",
   projectId: "my-first-project-f0e3b",
   storageBucket: "my-first-project-f0e3b.firebasestorage.app",
   messagingSenderId: "311555372398",
   appId: "1:311555372398:web:4ff02aeee5e8be0c803d7f",
   measurementId: "G-6SKMCN819D"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);