// credenciales de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCm_i88NXfrAXrjoqzxu1Y4y50vBWfXGhM',
  authDomain: 'scribo-app.firebaseapp.com',
  projectId: 'scribo-app',
  storageBucket: 'scribo-app.appspot.com',
  messagingSenderId: '568778636242',
  appId: '1:568778636242:web:025209afad2f2c1d8aa60b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
