import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../../firebase'
import './Home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Chat from '../../components/chat/Chat'
import { onSnapshot, doc } from "firebase/firestore"
import { db } from '../../firebase'


const Home = () => {

  const [currentChat, setCurrentChat] = useState(null)


  useEffect(() => {
    if (currentChat) {
    const unSub = onSnapshot(doc(db, "chats", currentChat?.chatId), (doc) => {
      doc.exists() && setCurrentChat(doc.data())
    });
  
    return () => {
      unSub();
    };}
  }, [currentChat?.chatId, currentChat?.messages]);


return (
<div className='home'>
  <div className='logout'>
    <button 
    onClick={() => signOut(firebaseAuth)}
    >Logout</button>
  </div>
  <div className="container">
    <div className="wrapper">
      <Sidebar
      currentChat={currentChat}
      setCurrentChat={setCurrentChat}
      />
      {currentChat
      ?
      <Chat currentChat={currentChat}/>
      :
      <div className="startChat">
        <span>Start a new conversation</span>
      </div>
      }
    </div>   
  </div>
</div>
)}

export default Home