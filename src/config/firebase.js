import firebase from 'firebase'
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDsUFL7ke_nHXgi7yN7q6GFho5tC2lELQY",
    authDomain: "proyectos-cliente.firebaseapp.com",
    databaseURL: "https://proyectos-cliente.firebaseio.com",
    projectId: "proyectos-cliente",
    storageBucket: "proyectos-cliente.appspot.com",
    messagingSenderId: "887799128715",
    appId: "1:887799128715:web:cdc047ebc905faced22a8e"
  });
  
  const db = firebase.firestore();

  export default db;

