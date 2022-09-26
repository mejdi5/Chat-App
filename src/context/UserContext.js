import React, {createContext, useEffect, useState} from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            setUsers(prev => [...prev, {id: doc.id, ...doc.data()}])
        });
        }
        return () => {
        getUsers()
        }
    }, [])

return (
    <UserContext.Provider value={users} >
        {children}
    </UserContext.Provider>
)}