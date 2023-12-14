import React,{useEffect,useState} from 'react'
import Login from './components/Login'
import SignIn from './components/Signin'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { auth } from './firebase'



function App() {
  const [presentUser,setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUser({
        uid:user.uid,
        email:user.email
      })
    } 
    })
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<SignIn/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    
    
    
    
  )
}

export default App