import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBGHcAnjPE2Na1mC3tqe02BcNd7BuCvPwM',
  authDomain: 'web-cay-canh.firebaseapp.com',
  projectId: 'web-cay-canh',
  storageBucket: 'web-cay-canh.appspot.com',
  messagingSenderId: '521149029992',
  appId: '1:521149029992:web:6ab93c2b384623b2b965dd',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
