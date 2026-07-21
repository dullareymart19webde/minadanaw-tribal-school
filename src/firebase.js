import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDY6-Wfg9FS8qbPK9YVs2QSsnlIx5YhxC8",
  authDomain: "tribal-db.firebaseapp.com",
  projectId: "tribal-db",
  storageBucket: "tribal-db.firebasestorage.app",
  messagingSenderId: "813733880190",
  appId: "1:813733880190:web:a35d83060eee4905e0932f",
  measurementId: "G-7XCDLKJP2Z"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
