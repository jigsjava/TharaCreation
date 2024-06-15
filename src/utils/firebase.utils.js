import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();
export const rtdb = getDatabase(firebaseApp);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Google Sign-In Error: ", error);
    throw error;
  }
};

export const createUserDocument = async (user) => {
  if (!user) {
    return; // No user to create a document for
  }

  const userDocRef = doc(db, "user", user.uid);

  const { displayName, email, photoURL } = user;
  const CreateDate = new Date();
  const userDocData = {
    displayName: displayName,
    email: email,
    photoURL: photoURL,
    date: CreateDate,
  };
  try {
    return await setDoc(userDocRef, userDocData, { merge: true });
  } catch (error) {
    console.error("Error creating user document: ", error);
    throw error;
  }
};
