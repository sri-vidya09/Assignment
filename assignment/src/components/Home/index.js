import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"

function Home() {
  const history = useNavigate()
  const onLogout=()=>{
    localStorage.clear()
    Cookies.remove("verification_token")
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
    history("/login")
  }
  return (
    <div className="bg-slate-200 h-[100vh]  flex flex-col items-center ">
        <h1 className='text-xl'>Hello!<span>Myself Vidya</span></h1>
        <button className='text-white cursor-pointer  p-2 rounded-md my-5 bg-orange-600 hover:bg-orange-700 active:bg-amber-400' onClick={onLogout}>Logout</button>
     
    </div>

   
  )
}

export default Home
