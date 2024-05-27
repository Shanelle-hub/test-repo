import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance"

function Signup() {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)


  const handleSignUp = async (e) => {
    e.preventDefault();
     if(!name){
      setError("Please enter  your name")
      return
     }
     if(!validateEmail(email)){
      setError("Please enter a valid email address ")
      return
     }
     if(!password){
      setError("Please enter your  password ")
     }
     
     setError("")
     try{
      const response =  await axiosInstance.post("/create-account", {
        fullName:name,
        email:email,
        password:password,
      });
      
      // Handle successful login response
    if(response.data && response.data.error){
      setError(response.data.message)
    };
    if(response.data && response.data.accessToken){
      localStorage.setItem("token",response.data.accessToken)
      navigate('/dashboard')
    };
      } catch(error){
      
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
        return
      } else{
      setError("An unexpected error occured .Please try again .")
      }
  }
  };
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input
              type='text'
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='email'
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type='submit' className='btn-primary'>
              Create An Account
            </button>
            <p className='text-sm text-center mt-4'>
              Already have an Account ?{" "}
              <Link to='/Login' className="font-medium text-primary underline" >
                Login 
              </Link>
              </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
