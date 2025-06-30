import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api.js';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const  schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  image: yup
      .mixed()
      .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
        if (!value || value.length === 0) return true; // allow no image
        return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
      }),
})

const UpdatProfile = () => {

  const [user, setUser] = useState({
    // name: '',
    // email: '',
    // image: ''
  })

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const {
    register, handleSubmit,formState: { errors }, setValue} = useForm({
      resolver: yupResolver(schema),
  })

  useEffect(() => {
    api.get('/viewprofile' , {
      headers: {
        Authorization : `Bearer ${token}`
      }
    }).then((res) => {
      const data = res.data.data
      setUser(data)

      setValue('name',data.name)
      setValue('email',data.email)
      // setValue('image',data.image)



    }).catch((err) => {
      alert('Error fetching data!')
    })
  }, [])

  // const handleChange = (e) => {
  //   setUser((prev) => ({
  //     ...prev,
  //     [e.target.name] : e.target.value
  //   }))
  // }

  // const handleImageChange = (e) => {
  //   setUser((prev) => ({
  //     ...prev,
  //     image: e.target.files[0]
  //   }))
  // }

  const onSubmit = async (data) => {
    // e.preventDefault();

    const formData = new FormData()
    formData.append('name',data.name)
    formData.append('email',data.email)

   if (data.image && data.image.length > 0) {
  formData.append('image', data.image[0]);
}


    await api.patch('/editprofile' , formData , {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then((res) => {
      alert('Profile updated successfully!')

      navigate('/viewprofile')
    })
    .catch((err) => {
      console.log(err.response.data.message,"rrrrr")
      alert(err.response.data.message)
    })

  }


  return (
    <div>
  
          <div className='browse'>
            <div className='overlay'>
              <h1 className='text-center pt-5'>Edit Profile</h1>
              <div className='browse-page d-flex justify-content-center'>
                <form
                  className="w-100"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: 'rgb(71 71 68) 0px 4px 12px',
                    maxWidth: '500px'
                  }}
                  encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='form-group mb-3'>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="form-control"
                      // name='name'
                      // value={user.name}
                      // onChange={handleChange}
                      {...register('name')}
                    />
                    <p className='error'>{errors.name?.message}</p>
                  </div>

                  <div className='form-group mb-3'>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-control"
                    //   name='email'
                    //   value={user.email}
                    //   onChange={handleChange}
                    {...register('email')}
                    />
                    <p className='error'>{errors.email?.message}</p>
                  </div>

                  <div className='form-group mb-4'>
                    <label>Upload Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      // name='image'
                      // onChange={handleImageChange}
                      {...register('image')}
                    />
                    <p className='error'>{ errors.image?.message}</p>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: 'rgb(181 138 164)',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: '500'
                    }}
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>


    </div>
  );
};

export default UpdatProfile