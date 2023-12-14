import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'

function SignIn() {
  const navigate = useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [errormsg,setError] = useState("")
    const onSubmitForm=(e)=>{
        e.preventDefault()
        setError("")
        if(email==="" || password===""){
            setError("Please fill All Fields")
        return;
        }
        if(password.length>6){
          setError("Password is weak,should be atleast 6 characters")
        }
        createUserWithEmailAndPassword(auth,email,password).then(async(res)=>{
         console.log(res)
         const user = res.user
         await updateProfile(user,{
          displayName:name
        });
        navigate("/")
        })
        .catch((error)=>{
          console.log("Error--",error.message)
          setError(error.message)
        })
        Cookies.set("verification_token","signin",{expires: 7})
        localStorage.setItem("userData",JSON.stringify({name,email}))
        alert("Successfully signedin")
    
    }
  return (
    <div className='bg-zinc-200 h-screen flex justify-center items-center'>
    <form className='bg-white h-96  w-2/4 border-2 border-yellow-900' onSubmit={onSubmitForm} >
      <h1 className='text-center font-semibold text-2xl text-yellow-900 my-2'>Hello,SignIn!</h1>
      <div className= "flex flex-col mx-5">
          <label className="text-md text-yellow-700 " htmlFor='userName'>Username</label>
          <input id="userName" type="text"
                 placeholder='enter name' 
                 className='outline-none h-10' 
                 value={name}
                 onChange={e=>setName(e.target.value)}
                 //required
                 />
        </div>
        <div className= "flex flex-col mx-5">
          <label className="text-md text-yellow-700 " htmlFor='email'>Email</label>
          <input id="email" type="email" name="email"
                 placeholder='enter email' 
                 className='outline-none h-10' 
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                 //required
                 />
        </div>
        <div className='flex flex-col mx-5'>
          <label className="text-md text-yellow-700" htmlFor='password'>Password</label>
          <input id="password" 
                 type="password" 
                 placeholder='********' 
                 className='outline-none h-10'
                 value={password}
                 onChange={e=>setPassword(e.target.value)}
                 //required
                  />
        </div>
              <p className='text-red-600 text-[10px] leading-3 mx-5 '>{errormsg}</p>
              <div className='m-2'>
                <button className='bg-sky-500 text-white p-2 rounded-md w-[100%] hover:bg-blue-700 active:bg-fuchsia-400 '> SignIn</button> 
              </div>
              
              <p className='mx-5 text-neutral-500'>New User?</p>
              <p className='text-center text-neutral-500'> Already have account?<Link to="/login"><span className='text-teal-600'>Login</span></Link></p>
      </form>
    </div>
    
  )
}

export default SignIn