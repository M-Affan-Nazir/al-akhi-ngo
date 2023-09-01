import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBkW_ghnRKiWWpzPDZ-_nBF4RGF-a1YX5w",
    authDomain: "alakhi-c8aa9.firebaseapp.com",
    projectId: "alakhi-c8aa9",
    storageBucket: "alakhi-c8aa9.appspot.com",
    messagingSenderId: "343384614013",
    appId: "1:343384614013:web:7e4c62586270f3b1b27d14",
    measurementId: "G-CC25E75P8S"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

export default firestore;