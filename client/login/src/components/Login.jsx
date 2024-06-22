import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()    
    axios.defaults.withCredentials=true
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login', {email, password}).then(response=>{
            if(response.data.status){
                navigate('/home')
            }
           
        }).catch(err=>console.log(err))
    }

  return (
    <div className='sign-up-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Login In</h2>

        <label htmlFor='email'>Email:</label>
        <input type='email' autoComplete='off' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor='password'>Password:</label>
        <input type='password' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Log In</button>
        <p>Don't have an Account? <Link to="/login">Sign Up</Link></p>
        </form>
      
    </div>
  )
}

export default Login
