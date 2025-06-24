import React, { useState } from 'react'
import '../styles/registration.css'
import api from '../api.js'
import Header from '../components/Header.js'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        role:'',
        image:null
    })

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleImageChange = (event) => {
        setUser((prev) =>({
            ...prev,
            image: event.target.files[0]
        }))

    }


    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData();
            formData.append('name',user.name)
            formData.append('email',user.email)
            formData.append('password',user.password)
            formData.append('role',user.role)
            formData.append('image',user.image)

            try{
                const res = await api.post('/user/registration', formData ,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log('registration success', res.data)
                alert('Registration Successful!')

                navigate('/login')
            }
            catch(error){
                 console.error('registration failed', error.message)
                  alert(error.response?.data?.message || 'Something went wrong during registration')  
            }
    }

    

    

  return (
    <div>
        <Header/>
        <div className='registration  d-flex justify-content-center align-items-center'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        
                    </div>
                    <div className='col-md-6 d-flex flex-column justify-content-end align-items-end'>
                        <h1 className='reg-h1 mt-5'>Welcome Aboard!</h1>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='mt-4 mb-2'>
                                <label>Name:</label>
                                <input 
                                    className='input-design' 
                                    type='name' 
                                    placeholder='Enter your name!'
                                    name='name'
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='my-4'> 
                                <label>Email:</label>
                                <input
                                    className='input-design'
                                    type='email' 
                                    placeholder='Enter your email!'
                                    name='email'
                                    value={user.email}
                                    onChange={handleChange}
                                 />
                            </div>
                            <div className='my-4'>
                                <label>Password:</label>
                                <input 
                                    className='input-design' 
                                    type='password' 
                                    placeholder='Enter your password!'
                                    name='password'
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <div className='my-4 '>
                                <label>Role:</label>
                                <input 
                                    className='' 
                                    type='radio'
                                    name='role' 
                                    value='Seller' 
                                    id='seller'
                                    
                                    // onChange={handleChange}
                                    
                                    />
                                <label className='mx-2' htmlFor='seller'>Seller</label>
                                <input 
                                    className='ms-5' 
                                    type='radio' 
                                    name='role' 
                                    value='buyer' 
                                    id='buyer'
                                    // onChange={handleChange}
                                    />
                                <label className='mx-2' htmlFor='buyer'>Buyer</label>
                            </div> */}

                            <div className='my-4'>
                                <label className='mb-2 d-block'>Role:</label>
                                <div className="d-flex align-items-center gap-5">
                                    <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        value="seller"
                                        id="seller"
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label ms-1" htmlFor="seller">
                                        Seller
                                    </label>
                                    </div>
                                    
                                    <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        id="buyer"
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label ms-1" htmlFor="buyer">
                                        Buyer
                                    </label>
                                    </div>
                                </div>
                                </div>


                            <div className='my-4'>
                                <label>Profile Image</label>
                                <input 
                                    className='input-design' 
                                    type='file'
                                    name='image'
                                    accept='image/*'
                                    
                                    onChange={handleImageChange}
                                    />
                            </div>
                            <button type='submit' >Sign up</button>
                        </form>
                        <hr className=''/>
                        <div>
                            <p>Already have account? <a href='/login'>Sign in</a></p>
                        </div>
                    </div>
                </div>
               

            </div>
        </div>
    </div>


    
  )
}

export default Registration