import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  createUserDocument,
  signInWithGoogle,
} from "../utils/firebase.utils";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        await createUserDocument(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    createUserDocument,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
