import React,{useEffect,useState} from 'react'
import { getAuth, signOut } from "firebase/auth";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader";

function Home() {
  const history = useNavigate()
  const [loading,setLoading]=useState(false)
  const onLogout=()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    Cookies.remove("token")
  }).catch((error) => {
    // An error happened.
  });
    history("/login")
  }

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },3000)
  },[])

  return (
    <div className='h-screen flex justify-center items-center'>
    {loading?<ScaleLoader
      color={"#f25e02"}
      loading={loading}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />:<div className="bg-slate-200 h-[100vh]  flex flex-col items-center  w-[100vw]">
    <h1 className='text-xl'>Hello!<span>Myself Vidya</span></h1>
    <button className='text-white cursor-pointer  p-2 rounded-md my-5 bg-orange-600 hover:bg-orange-700 active:bg-amber-400' onClick={onLogout}>Logout</button>
 
</div>}
    </div>
    
    

   
  )
}

export default Home
