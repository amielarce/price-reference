import firebase from 'firebase/app';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyDoqAJ-d-UERIc-LfguqDN8UItS4I3LtRU",
  authDomain: "price-ref.firebaseapp.com",
  projectId: "price-ref",
  storageBucket: "price-ref.appspot.com",
  messagingSenderId: "546374940976",
  appId: "1:546374940976:web:7689e9132a384b1f84f0f5",
  measurementId: "G-1D5MMTRLHV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const projectFirestore = firebase.firestore();

export {projectFirestore};
