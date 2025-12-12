import {
  GoogleAuthProvider, createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";


import { useEffect, useState } from "react";
import { auth } from "../fireBase/fireBase";
import { AuthContext } from "./AuthContext";


const googleProvider = new GoogleAuthProvider() 




const AuthProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);





  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password) 
  }



  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password) 
  }



  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }




  const signInGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }



  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  //  Add auth state listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      unSubscribe()
    }
  }, [])


  

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
    
  }

  return (
    <AuthContext.Provider value={authInfo}> 
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider