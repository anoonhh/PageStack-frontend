import React, { useState } from 'react';
import '../styles/addform.css'; 
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddBook = () => {
  const [ addBook , setAddBook ] = useState({
    title:'',
    author:'',
    description:'',
    price:0,
    stock:0,
    category:'',
    rating:0,
    image:null
  })

  const token = localStorage.getItem('token')

  const navigate = useNavigate()


  const handleChange = (e) => {
    setAddBook((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handleImageChange = (event) => {
    setAddBook((prev) => ({
      ...prev,
      image: event.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('title',addBook.title)
    formData.append('author',addBook.author)
    formData.append('description',addBook.description)
    formData.append('price',addBook.price)
    formData.append('stock',addBook.stock)
    formData.append('category',addBook.category)
    formData.append('rating',addBook.rating)
    formData.append('image',addBook.image)



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
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter book title" 
              name='title'
              value={addBook.title}
              onChange={handleChange}
              />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input 
              type="text" 
              placeholder="Author name" 
              name='author'
              value={addBook.author}
              onChange={handleChange}
              />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
            placeholder="Short description..." 
            name='description'
            value={addBook.description}
            onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              placeholder="Enter price" 
              name='price'
              value={addBook.price}
              onChange={handleChange}
              />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input 
              type="number" 
              placeholder="Number of books in stock" 
              name='stock'
              value={addBook.stock}
              onChange={handleChange}
              />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              name='category'
              value={addBook.category}
              onChange={handleChange}
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
          </div>

          <div className="form-group">
            <label>Rating (0 - 5)</label>
            <input 
              type="number" 
              placeholder="Rating"
              name='rating' 
              value={addBook.rating}
              onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label>Book Cover Image</label>
            <input 
              type="file" 
              accept="image/*" 
              name='image'
              onChange={handleImageChange}
              />
          </div>

          <button type="submit" className="submit-btn">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
