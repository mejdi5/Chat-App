import React, { useContext, useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/home/Home";
import Auth from './pages/auth/Auth'
import Loading from './pages/loading/Loading'
import {AuthContext} from './context/AuthContext'
import { UserContextProvider } from "./context/UserContext";
import {UserChatContextProvider} from './context/ChatContext'

function App() {

  const user = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }, [])
  

return (
<BrowserRouter>
    <Routes>
      <Route index path="/" element={
        user 
        ? 
        <UserContextProvider>
          <UserChatContextProvider>
            <Home/>
          </UserChatContextProvider>
        </UserContextProvider> 
        : loading
        ? <Loading AuthContext={AuthContext}/>
        : <Navigate to="/auth"/>
        }/>
      <Route path="/auth" element={
        loading
        ? <Loading AuthContext={AuthContext}/>
        : !user 
        ? <Auth setLoading={setLoading}/>
        : <Navigate to="/"/>
        }/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
