import React, { useState } from 'react';
import '../styles/addform.css'; 
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'


const schema = yup.object().shape({
  title : yup.string().required('Title is required'),
  author: yup.string().required("Author is required"),
  description: yup.string().required('Description is required').min(10,"Description must be atleast 10 characters long"),
  price: yup.number().required('Price is required').positive().typeError('Price must be a positive value'),
  // stock: yup.number().required('Stock is required').integer().min(0,'Stock cannot be negative'),
  stock: yup
  .number()
  .typeError('Stock must be a number') // handles if user enters letters
  .transform((value, originalValue) =>
    String(originalValue).trim() === '' ? undefined : value
  )
  .required('Stock is required')
  .integer('Stock must be an integer')
  .min(0, 'Stock cannot be negative'),

  category: yup.string().required('Category is required'),
  // rating: yup.number().required('Rating is required ').min(0,'Rating cannot be less than 0').max(5,'Rating cannot be more than 5'),
  rating: yup
  .number()
  .typeError('Rating must be a number')
  .required('Rating is required')
  .min(0, 'Rating cannot be less than 0')
  .max(5, 'Rating cannot be more than 5'),


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

const AddBook = () => {
  // const [ addBook , setAddBook ] = useState({
  //   title:'',
  //   author:'',
  //   description:'',
  //   price:0,
  //   stock:0,
  //   category:'',
  //   rating:0,
  //   image:null
  // })

  const token = localStorage.getItem('token')

  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  })


  // const handleChange = (e) => {
  //   setAddBook((prev) => ({
  //     ...prev,
  //     [e.target.name] : e.target.value
  //   }))
  // }

  // const handleImageChange = (event) => {
  //   setAddBook((prev) => ({
  //     ...prev,
  //     image: event.target.files[0]
  //   }))
  // }

  const onSubmit = async (data) => {
    // e.preventDefault();

    const formData = new FormData()
    formData.append('title',data.title)
    formData.append('author',data.author)
    formData.append('description',data.description)
    formData.append('price',data.price)
    formData.append('stock',data.stock)
    formData.append('category',data.category)
    formData.append('rating',data.rating)
    formData.append('image',data.image[0])



    const res = await api.post('/api/book/addbook',formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      alert("Book added successfully")
      navigate('/books')
    }).catch((err) => {
      alert("Book is not added!")
    })
    
  }
  return (
    <div className="add-book-page">
      <div className="form-container">
        <h1 className="form-title">Add New Book</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter book title" 
              // name='title'
              // value={addBook.title}
              // onChange={handleChange}
              {...register('title')}
              />
              <p className='error'>{errors.title?.message} </p>
          </div>

          <div className="form-group">
            <label>Author</label>
            <input 
              type="text" 
              placeholder="Author name" 
              // name='author'
              // value={addBook.author}
              // onChange={handleChange}
              {...register('author')}
              />
              <p className='error'>{errors.author?.message}</p>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
            placeholder="Short description..." 
            // name='description'
            // value={addBook.description}
            // onChange={handleChange}
            {...register('description')}
            />
            <p className='error'>{errors.description?.message}</p>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              placeholder="Enter price" 
              // name='price'
              // value={addBook.price}
              // onChange={handleChange}
              {...register('price')}
              />
              <p className='error'>{errors.price?.message}</p>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input 
              type="number" 
              placeholder="Number of books in stock" 
              // name='stock'
              // value={addBook.stock}
              // onChange={handleChange}
              {...register('stock')}
              />
              <p className='error'>{errors.stock?.message}</p>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              name='category'
              // value={addBook.category}
              // onChange={handleChange}
              {...register('category')}
              >
                <option value=''>--</option>
                <option value={'Fiction'}>Fiction</option>
                <option value={'Non Fiction'}>Non Fiction</option>
                <option value={'Romance'}>Romance</option>
                <option value={'Mystery & Thriller'}>Mystery & Thriller</option>
                <option value={'Sci-fi'}>Sci-fi</option>
                <option value={'Biography'}>Biography</option>
                <option value={'Children'}>Children</option>
                <option value={'Fantasy'}>Fantasy</option>
                <option value={'Comic & Graphics Novels'}>Comic & Graphics Novels</option>
                <option value={'Business & Economics'}>Business & Economics</option>
                <option value={'Poetry'}>Poetry</option>
                <option value={'Others'}>Others</option>
            </select>
            <p className='error'> {errors.category?.message}</p>
          </div>

          <div className="form-group">
            <label>Rating (0 - 5)</label>
            <input 
              type="number" 
              placeholder="Rating"
              step='0.1'
              // name='rating' 
              // value={addBook.rating}
              // onChange={handleChange}
              {...register('rating')}
              />
              <p className='error'>{errors.rating?.message}</p>
          </div>

          <div className="form-group">
            <label>Book Cover Image</label>
            <input 
              type="file" 
              accept="image/*" 
              // name='image'
              // onChange={handleImageChange}
              {...register('image')}
              />
              <p className='error'>{errors.image?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
