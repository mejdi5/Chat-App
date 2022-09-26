// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC0xSQQT5qPI7gnYC5suk1pxEKfOLtw03M",
  authDomain: "chat-app-91c16.firebaseapp.com",
  projectId: "chat-app-91c16",
  storageBucket: "chat-app-91c16.appspot.com",
  messagingSenderId: "830816280664",
  appId: "1:830816280664:web:2f3ec2f6f42dbbd65cea2d",
  measurementId: "G-4D35S5DB1F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
