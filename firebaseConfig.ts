import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDF3snwg3S0km7ezraVmjbQj2Lm3iZjBC0',
  authDomain: 'mood-tracker-b7485.firebaseapp.com',
  projectId: 'mood-tracker-b7485',
  storageBucket: 'mood-tracker-b7485.appspot.com',
  messagingSenderId: '313800420110',
  appId: '1:313800420110:ios:20b03e5ca2d0fc28fec55f',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);

export { app, auth, firestore };
