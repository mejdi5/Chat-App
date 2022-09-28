import React, {createContext, useEffect, useState, useContext} from 'react';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { AuthContext } from './AuthContext';
import { UserContext } from './UserContext';

export const UserChatContext = createContext()

export const UserChatContextProvider = ({children}) => {
    const [userChats, setUserChats] = useState([])
    const user = useContext(AuthContext)
    const users = useContext(UserContext)

    //console.log(userChats)
    
    useEffect(() => {
        const setChats = async () => {
            await users.filter(u => u.id !== user.id).map(async u => {
                if(userChats.map(chat => chat.chatId).every(id => !id.includes(`${u.id}`))) {
                const chatId = user.id > u.id ? `${user.id}${u.id}` : `${u.id}${user.id}`
                await setDoc(doc(db, "chats", chatId), {
                    chatId,
                    persons: [user, u],
                    messages: []
                })
                };
            })
        }
        const getChats = async () => {
            const querySnapshot = await getDocs(collection(db, "chats"));
            const allChats = querySnapshot.docs.map(doc => doc.data())
            const currentUserChats = allChats.filter(chat => chat.persons.some(p => p.id === user?.id))
            setUserChats(currentUserChats)
        }
        return () => {
        setChats()
        getChats()
        }
    }, [users])

return (
    <UserChatContext.Provider value={userChats} >
        {children}
    </UserChatContext.Provider>
)}