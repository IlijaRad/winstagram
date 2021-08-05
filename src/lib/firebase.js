import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import {seedDatabase} from '../seed';

const config = {
    apiKey: "AIzaSyDr12L7-4lq73WB1ni3n_i3KQXdeP8ObA8",
    authDomain: "instagram-testing-895eb.firebaseapp.com",
    projectId: "instagram-testing-895eb",
    storageBucket: "instagram-testing-895eb.appspot.com",
    messagingSenderId: "609653560482",
    appId: "1:609653560482:web:0ad14caa8f19c3d14833fb"
};

const firebase = Firebase.initializeApp(config);

const {FieldValue} = Firebase.firestore;

//seedDatabase(firebase);

export {firebase, FieldValue};