import React, {createContext, useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
    const getAuth = onAuthStateChanged(firebaseAuth, currentUser => {
        if (currentUser) {
        setUser({
            id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            image: currentUser.photoURL
        })
        } else {
        setUser(null)
        }
    })
    return () => {
        getAuth()
    }
    }, [])

return (
    <AuthContext.Provider value={user} >
        {children}
    </AuthContext.Provider>
)}