import {
  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../fireBase/fireBase";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  
  const saveUserToDatabase = async (userData) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: userData.uid,
          email: userData.email,
          name: userData.displayName || userData.email.split('@')[0],
          photoURL: userData.photoURL,
          role: userData.role || 'student'
        })
      });

      if (!response.ok) {
        console.error('Failed to save user to database');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const registerUser = async (email, password, additionalData = {}) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
     
      if (additionalData.name) {
        await updateProfile(result.user, { displayName: additionalData.name });
      }
      
    
      await saveUserToDatabase({
        uid: result.user.uid,
        email: result.user.email,
        displayName: additionalData.name || email.split('@')[0],
        photoURL: result.user.photoURL,
        role: additionalData.role || 'student'
      });
      
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
    
      await saveUserToDatabase({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: 'student' 
      });
      
      return result;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          
          const res = await fetch(`${apiUrl}/api/users/${currentUser.uid}`);
          
          if (res.ok) {
            const data = await res.json();
            setUser({ ...currentUser, role: data.role });
          }
           else {
            
            await saveUserToDatabase(currentUser);
            setUser({ ...currentUser, role: 'student' });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [apiUrl]);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;