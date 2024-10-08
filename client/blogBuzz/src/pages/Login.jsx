
import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
const Login = () => {
  const [inputs,setInputs]= useState({
    email:"",
    password:"",
  })

  const [err, setError] = useState(null);
  
  const navigate =useNavigate();

  const {login,currentUser} =useContext(AuthContext);

  const handleChange=e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit= async e=>{
    e.preventDefault();
    try{
      await login(inputs)
       navigate("/")
      
    }catch(err){
      console.log(err);
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input  required name='email'  type='email' placeholder='email' onChange={handleChange}/>
        <input name='password' type="password" placeholder='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err&&<p>{err}</p>}
        <span>Not have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login

