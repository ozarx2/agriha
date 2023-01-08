// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// const firebaseConfig = {
//   apiKey: "AIzaSyB0csftk73F_f0QG8586CwMBXTAkoW1Jpc",
//   authDomain: "arclif-socialmedia-backend.firebaseapp.com",
//   projectId: "arclif-socialmedia-backend",
//   storageBucket: "arclif-socialmedia-backend.appspot.com",
//   messagingSenderId: "903847952391",
//   appId: "1:903847952391:web:522cf8212180cc17e5aaa2",
//   measurementId: "G-W5R6X58EBL",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCizhofwSv7K4-f2HhdGlqQCrFKbAkSCko",
  authDomain: "arclifimg.firebaseapp.com",
  projectId: "arclifimg",
  storageBucket: "arclifimg.appspot.com",
  messagingSenderId: "655745297713",
  appId: "1:655745297713:web:7f64c8eed80baf844c1410",
  measurementId: "G-0FP28ESW7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
