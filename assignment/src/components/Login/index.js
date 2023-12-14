import React,{useState} from 'react'
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import {Link,useNavigate} from "react-router-dom"
import Cookies from 'js-cookie';
import { auth } from '../../firebase';


function Login() {
  const navigate = useNavigate();
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
        signInWithEmailAndPassword(auth,email,password).then((res)=>{
          const {_tokenResponse}=res
          console.log(_tokenResponse)
        console.log("response",res)
        const {idToken}=_tokenResponse
        console.log("token",idToken)
        Cookies.set("login_token",idToken,{
          expires:30,
        })

        
        navigate("/")
       }).catch((error)=>{
        setError("Wrong username or password",error.msg)
        console.log(error)
       })
        
    }
    const signUpWithGoogle=()=>{
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
      .then((result) => {
        const {email} = result.user;
        console.log({email})
        navigate("/home")
      }).catch((error) => {
       setError("Error:Login with valid gmail",error.msg)
      });
    }

    
  return (
    <div className='bg-zinc-200 h-screen flex justify-center items-center'>
    <form className='bg-white h-96  w-2/4 border-2 border-yellow-900' onSubmit={onSubmitForm} >
      <h1 className='text-center font-semibold text-2xl text-yellow-900 my-2'>Hello!User</h1>
        <div className= "flex flex-col mx-5">
          <label className="text-md text-yellow-700 " htmlFor='email'>Email</label>
          <input id="email" type="text"
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
                <button className='bg-green-500 text-white p-2 rounded-md w-[100%] hover:bg-green-800 active:bg-lime-500 '> Login</button> 
              </div>
              
              <p className='mx-5 text-neutral-500'>Already have account?</p>
              <div className='flex justify-center my-5'>
              <FcGoogle className='cursor-pointer h-7 w-7 ' onClick={signUpWithGoogle}/>
              <p className='text-sm'>Login with Google</p>
              </div>
              <p className='text-center text-neutral-500'>New User?<Link to="/signin"><span className='text-teal-600'>SignIn</span></Link></p>
      </form>
    </div>
  )
}

export default Login