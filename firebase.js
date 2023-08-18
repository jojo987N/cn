import {initializeApp} from 'firebase/app'
import {collection, initializeFirestore} from 'firebase/firestore'
    

const firebaseConfig = {

  apiKey: "AIzaSyAsejSaiFj1jADc767TSktiVnNSP0Unr5w",

  authDomain: "store-f87d1.firebaseapp.com",

  projectId: "store-f87d1",

  storageBucket: "store-f87d1.appspot.com",

  messagingSenderId: "221405358581",

  appId: "1:221405358581:web:61a7a9d6e6cd8c6f5318bc"

  
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = initializeFirestore(firebaseApp, {experimentalForceLongPolling: true});


  export const appVersionsCol = collection(db, 'appVersions')

