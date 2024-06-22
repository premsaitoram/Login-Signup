import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()    
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', {name, email, password}).then(response=>{
            if(response.data.status){
                navigate('/login')
            }
           
        }).catch(err=>console.log(err))
    }

  return (
    <div className='sign-up-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor='name'>Name:</label>
        <input type='text' placeholder='Username' onChange={(e)=>setName(e.target.value)}/>

        <label htmlFor='email'>Email:</label>
        <input type='email' autoComplete='off' placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor='password'>Password:</label>
        <input type='password' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Sign Up</button>
        <p>Have an Account? <Link to="/login">Login</Link></p>
        </form>
      
    </div>
  )
}

export default Signup
