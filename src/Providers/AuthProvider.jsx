import { app } from "@/Firebase/firebase.config";
import axiosPublic from "@/Hooks/axiosPublic";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,GoogleAuthProvider} from "firebase/auth"
import { createContext, useEffect, useState } from "react";

export const AuthContext =createContext(null)
const axios = axiosPublic()
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

    const googleSignIn = () => {
        setloading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
      };


    
    useEffect(() => {
      const unsubscribe =   onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser){
                // get token and store client 
                const userInfo ={ email: currentUser.email}
                axios.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setloading(false)
                    }
                    
                })

            }else{
                localStorage.removeItem('access-token')
                setloading(false)
            }
           
            
           
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
        updateUserProfile,
        googleSignIn



    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;