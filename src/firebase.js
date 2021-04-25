import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAkE2CY-jT1IcCtpFXzCGOm-_tdpevrLIY",
    authDomain: "todo-app-tahmid.firebaseapp.com",
    projectId: "todo-app-tahmid",
    storageBucket: "todo-app-tahmid.appspot.com",
    messagingSenderId: "256436819530",
    appId: "1:256436819530:web:42c989285d96758a4fb8b3",
    measurementId: "G-E0EKKM5T5W"
});

const db = firebaseApp.firestore();

export default db;
