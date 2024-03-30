import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//@NOTE for reviewer - Here you can add credentials that I sent you.
const firebaseConfig = {
  apiKey: 'AIzaSyAuI2BKT7GxfkjM7Dx_ESjMsEu9BCftF00',
  authDomain: 'blueclipchatapp.firebaseapp.com',
  projectId: 'blueclipchatapp',
  storageBucket: 'blueclipchatapp.appspot.com',
  messagingSenderId: '876629740258',
  appId: '1:876629740258:web:e4db2f1dd5cf7fd338acbb'
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
