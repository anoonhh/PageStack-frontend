
import '../styles/login.css'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import api  from '../api.js'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().required("Email  is required"),
  password: yup.string().required("Password is required").min(8, "Password must be atleast 8 characters")
})

const LoginPage = () => {
 
  //validation
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()
  
  const onSubmit = async (data) =>{

    try{
       await api.post('/user/login', data,{
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

                  <form onSubmit={handleSubmit(onSubmit)} encType='application/json'>
                    <div className='my-4'>
                        <label>Email</label>
                        <input 
                          type='email' 
                          placeholder= ' Enter your email'
                          {...register('email')}
                          />
                          <p className='error'>{errors.email?.message}</p>
                    </div>
                    <div className='mb-5'>
                        <label>Password</label>
                        <input 
                          type='password' 
                          placeholder='Enter your password'
                          {...register('password')}
                          />
                          <p className='error'>{errors.password?.message}</p>
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