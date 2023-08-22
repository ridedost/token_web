// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBAr1wzi_QkfwY7MOYgKxO7wS0EvpcKw9E",
//   authDomain: "mobile-otp-10278.firebaseapp.com",
//   projectId: "mobile-otp-10278",
//   storageBucket: "mobile-otp-10278.appspot.com",
//   messagingSenderId: "526868722138",
//   appId: "1:526868722138:web:17099dc4a759191cb950e3",
//   measurementId: "G-RMY5QMKY88",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDuvzQvfb1UgUpV9360epBr5djV_4bZ6pM",
  authDomain: "mobile-otp-3de79.firebaseapp.com",
  projectId: "mobile-otp-3de79",
  storageBucket: "mobile-otp-3de79.appspot.com",
  messagingSenderId: "1010443671986",
  appId: "1:1010443671986:web:c403125db400868d4b6cab",
  measurementId: "G-VZY1QXYPNQ",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBNem2PTy32lPvPhPI3i77oHn74yv2oBvw",
//   authDomain: "token-app-b2c6b.firebaseapp.com",
//   projectId: "token-app-b2c6b",
//   storageBucket: "token-app-b2c6b.appspot.com",
//   messagingSenderId: "576384722290",
//   appId: "1:576384722290:web:e59b5b71c8c713eddce9eb",
//   measurementId: "G-3XQZ9VN09F",
// };

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// {
// "mobile":"9787432368",
// "name":"chand babu",
// "DOB":"20-03-2000",
// "email":"jafri.nbj@gmail.com"

// }
