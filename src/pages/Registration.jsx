
import '../styles/registration.css'
import api from '../api.js'
import Header from '../components/Header.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
    name : yup.string().required("Name is required"),
    email : yup.string().required("Email is required"),
    password : yup.string().required("Password is required").min(8,"Password must be at least 8 characters"),
    role: yup.string().required('Select role').oneOf(["seller" , "buyer"], 'Select valid role'),
    image : yup.mixed().required("Image is required")
        .test("fileExist", "Please upload a file", (value) => {
            return value && value.length > 0;
        })
        .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
            return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
            );
        }),
    })

const Registration = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    
    const navigate = useNavigate()

    const onSubmit = async (data) => {

        const formData = new FormData();
            formData.append('name',data.name)
            formData.append('email',data.email)
            formData.append('password',data.password)
            formData.append('role',data.role)
            formData.append('image',data.image[0])

            try{
                const res = await api.post('/user/registration', formData ,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log('registration success', res.data)
                alert('Registration Successful!')

                localStorage.setItem('token', res.data.access_token)
                localStorage.setItem('user',JSON.stringify(res.data.data))

                navigate('/books')
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
                        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                            <div className='mt-4 mb-2'>
                                <label>Name:</label>
                                <input 
                                    className='input-design' 
                                    type='name' 
                                    placeholder='Enter your name!'
                                    {...register('name')}
                                />
                                <p className="error">{errors.name?.message}</p>
                            </div>
                            <div className='my-4'> 
                                <label>Email:</label>
                                <input
                                    className='input-design'
                                    type='email' 
                                    placeholder='Enter your email!'
                                    {...register('email')}
                                 />
                                 <p className="error">{errors.email?.message}</p>
                            </div>
                            <div className='my-4'>
                                <label>Password:</label>
                                <input 
                                    className='input-design' 
                                    type='password' 
                                    placeholder='Enter your password!'
                                    {...register('password')}
                                />
                                <p className="error">{errors.password?.message}</p>
                            </div>
                           
                            <div className='my-4'>
                                <label className='mb-2 d-block'>Role:</label>
                                <div className="d-flex align-items-center gap-5">
                                    <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        value="seller"
                                        id="seller"
                                        {...register('role')}
                                    />
                                    <label className="form-check-label ms-1" htmlFor="seller">
                                        Seller
                                    </label>
                                    </div>
                                    
                                    <div className="form-check">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        value="buyer"
                                        id="buyer"
                                        {...register('role')}
                                    />
                                    <label className="form-check-label ms-1" htmlFor="buyer">
                                        Buyer
                                    </label>
                                    </div>
                                </div>
                                    <p className="error">{errors.role?.message}</p>
                            </div>

                            <div className='my-4'>
                                <label>Profile Image</label>
                                <input 
                                    className='input-design' 
                                    type='file'
                                    accept='image/*'
                                    {...register('image')}
                                    />
                                    <p className="error">{errors.image?.message}</p>
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