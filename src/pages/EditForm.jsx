
import { useEffect, useState } from 'react';
import '../styles/editform.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'



const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required("Author is required"),
  description: yup.string().required('Description is required').min(10, "Minimum 10 characters"),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be positive'),

  stock: yup
    .number()
    .typeError('Stock must be a number')
    .required('Stock is required')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),

  category: yup.string().required('Category is required'),

  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot be more than 5'),

  // Image is optional in update
  image: yup
    .mixed()
    .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
      if (!value || value.length === 0) return true; // allow no image
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
})


const EditBook = () => {

  const {id} = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  const [book , setBook] = useState()
  //   title:'',
  //   author:'',
  //   description:'',
  //   price:'',
  //   stock:'',
  //   category:'',
  //   rating:'',
  //   image:''
  // })

  const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    })

  useEffect ( () => {
    api.get(`/api/book/viewbook/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data.data;
    setBook(data);

    //  use data directly, not setBook.*
    setValue('title', data.title);
    setValue('author', data.author);
    setValue('description', data.description);
    setValue('price', data.price);
    setValue('stock', data.stock);
    setValue('category', data.category);
    setValue('rating', data.rating);

      
    })
    .catch((err) =>{
      alert('error fetching data!')
    })
  },[id])




  // const handleChange = (event) => {
  //   setBook((prev) => ({
  //     ...prev,
  //     [event.target.name] : event.target.value
  //   }))
  // }

  // const handleImageChange = (e) => {
  //   setBook((prev) => ({
  //     ...prev,
  //     image: e.target.files[0]
  //   }))
  // }

  const onSubmit = async (data) => {

    console.log(data,"data on submission")

    // e.preventDefault()
    // console.log(book.image,"image from book")

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('author', data.author)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('stock', data.stock)
    formData.append('category', data.category)
    formData.append('rating', data.rating)
    // formData.append('image', book.image)

    if (data.image instanceof File) {
      formData.append('image', data.image);
    }



    await api.patch(`/api/book/updatebook/${id}`,formData , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) =>{
      alert('book updated successfully!')

      navigate('/books')
      
    }).catch((err) => {
      alert('error updating book!')
    })
  }


 

  return (
    <div className="edit-book-page">
      <div className="form-container">
        <h1 className="form-title">Edit Book</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Book title" 
              // name='title'
              // value={book.title}
              // onChange={handleChange}
              {...register('title')}
              />
              <p className='error'>{errors.title?.message}</p>
          </div>

          <div className="form-group">
            <label>Author</label>
            <input 
              type="text" 
              placeholder="Author name" 
              // name='author'
              // value={book.author}
              // onChange={handleChange}
              {...register('author')}
              />
              <p className='error'> {errors.author?.message}</p>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Description"
              // name='description'
              // value={book.description}
              // onChange={handleChange}
              {...register('description')}
              />
              <p className='error'>{errors.description?.message}</p>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              placeholder="Price"  
              // name='price'
              // value={book.price}
              // onChange={handleChange}
              {...register('price')}
              />
              <p className='error'>{errors.price?.message}</p>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input 
              type="number" 
              placeholder="Stock quantity"
              // name='stock'
              // value={book.stock}
              // onChange={handleChange}
              {...register('stock')}
              />
              <p className='error'>{errors.stock?.message}</p>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              // name='category'
              // value={book.category}
              // onChange={handleChange}
              {...register('category')}
              >
                <option value={''}>--</option>
                <option value={'Fiction'}>Fiction</option>
                <option value={'Non Fiction'}>Non Fiction</option>
                <option value={'Romance'}>Romance</option>
                <option value={'Mystery & Thriller'}>Mystery & Thriller</option>
                <option value={'Sci-fi'}>Sci-fi</option>
                <option value={'Biography'}>Biography</option>
                <option value={'Children'}>Children</option>
                <option value={'Fantasy'}>Fantasy</option>
                <option value={'Comic $ Graphic Novels'}>Comic & Graphics Novels</option>
                <option value={'Business & Economics'}>Business & Economics</option>
                <option value={'Poetry'}>Poetry</option>
                <option value={'Others'}>Others</option>
            </select>
            <p className='error'>{errors.category?.message}</p>
          </div>

          <div className="form-group">
            <label>Rating (0 - 5)</label>
            <input 
              type="number" 
              placeholder="Rating" 
              step={'0.1'}
              // name='rating'
              // value={book.rating}
              // onChange={handleChange}
              {...register('rating')}
              />
              <p className='error'>{errors.rating?.message}</p>
          </div>

          <div className="form-group">
            <label>Change Cover Image</label>
            <input 
              type="file" 
              accept="image/*" 
              // name='image'
              // onChange={handleImageChange}
              {...register('image')}
              />
              <p className='error'>{errors.image?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
