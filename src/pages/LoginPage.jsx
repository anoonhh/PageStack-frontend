import React, { useState } from 'react'
import '../styles/login.css'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import api  from '../api.js'

const LoginPage = () => {
  const [user , setUser] = useState({
    email : '',
    password : ''
  })
  
  const handleChange = (e) =>{
    setUser((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }


  const navigate = useNavigate()
  
  const handleSubmit = async (event) =>{
    event.preventDefault()

    try{
       const res = await api.post('/user/login', user,{
          headers : {
            'Content-Type' : 'application/json',
          }
       }).then((res)=>{
          alert('Login Success')

          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          
          navigate('/books')
       })
    }catch(error){
      alert(error.response?.data?.message || 'Invalid Credentials')
    }

  }

  return (
    <div>
      <Header/>
      <div className='login d-flex justify-content-center align-items-center' >
        <div className=' container'>
          <div className='row'>
              <div className='col-md-6 '>
                  <h1 className='my-5'>Welcome Back!</h1>

                  <form onSubmit={handleSubmit} encType='application/json'>
                    <div className='my-4'>
                        <label>Email</label>
                        <input 
                          type='email' 
                          placeholder= ' Enter your email'
                          name='email'
                          value={user.email}
                          onChange={handleChange}
                          />
                    </div>
                    <div className='mb-5'>
                        <label>Password</label>
                        <input 
                          type='password' 
                          placeholder='Enter your password'
                          name='password'
                          value={user.password}
                          onChange={handleChange}
                          />
                    </div>
                    
                    <button type='submit'>Log In</button>

                  </form><br/>
                  <hr className='my-4'/>
                  <div >
                    <p>Don't have an account? <a href='/registration' >Sign up</a></p>
                  </div>
              </div>
              <div className='col-md-6'></div>
          </div>
          
          </div>
        

      </div>
    </div>
  )
}

export default LoginPage