import React, {createContext, useEffect, useState} from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([])
    console.log(users)
    
    useEffect(() => {
        const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            setUsers(prev => !prev.some(user => user.id === doc.id) ? [...prev, {id: doc.id, ...doc.data()}] : prev)
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