import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//@NOTE for reviewer - Here you can add credentials that I sent you.
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
