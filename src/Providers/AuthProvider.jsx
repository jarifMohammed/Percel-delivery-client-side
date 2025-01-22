import { app } from "@/Firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import { createContext, useEffect, useState } from "react";

export const AuthContext =createContext(null)
const auth  = getAuth(app)
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading,setloading] =useState(true)

    const createuser = (email,password) => {
        setloading(true)
    return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)

    }
    const logout = () => {
        setloading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL: photo
        })

    }


    
    useEffect(() => {
      const unsubscribe =   onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser);
            setloading(false)
        })
        return () => {
            return unsubscribe()
        }
    } , [])
    const authInfo = {
        user,
        loading,
        createuser,
        signIn,
        logout,
        updateUserProfile



    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;