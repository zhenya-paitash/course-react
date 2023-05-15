// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmg9ch8cppQrXA0JpynYWtxg1sOZ1VQEI',
  authDomain: 'house-marketplace-app-f513b.firebaseapp.com',
  projectId: 'house-marketplace-app-f513b',
  storageBucket: 'house-marketplace-app-f513b.appspot.com',
  messagingSenderId: '216762344361',
  appId: '1:216762344361:web:8691f618f1064bda089ab8',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
initializeApp(firebaseConfig)
export const db = getFirestore()
