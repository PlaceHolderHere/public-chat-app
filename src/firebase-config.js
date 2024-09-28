// Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const apiKey = import.meta.env.VITE_APIKEY;
const authDomain = import.meta.env.VITE_AUTHDOMAIN
const projectId = import.meta.env.VITE_PROJECTID
const storageBucket = import.meta.env.VITE_STORAGEBUCKET
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID
const appId = import.meta.env.VITE_APPID
const measurementId = import.meta.env.VITE_MEASUREMENTID

const app = initializeApp({
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  });

export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider()
export const database = getFirestore(app)