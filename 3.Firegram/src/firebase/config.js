import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAI2uLFTXQOwLl4m56uYQeLZi5UD9Jy6cA",
  authDomain: "react-firegram-edd0e.firebaseapp.com",
  databaseURL: "https://react-firegram-edd0e.firebaseio.com",
  projectId: "react-firegram-edd0e",
  storageBucket: "react-firegram-edd0e.appspot.com",
  messagingSenderId: "1038654119240",
  appId: "1:1038654119240:web:954e07a0aeceb8ae94677d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();


export { projectStorage, projectFirestore };