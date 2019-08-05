import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCluZSPEzUu_DXDMUoLKPteCadeDI7AArg",
    authDomain: "carbu-meter.firebaseapp.com",
    databaseURL: "https://carbu-meter.firebaseio.com",
    projectId: "carbu-meter",
    storageBucket: "carbu-meter.appspot.com",
    messagingSenderId: "596291489486",
    appId: "1:596291489486:web:0bee780f38cbf791"
});

const db = firebaseApp.firestore();

export { db }; 