import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api.js'
import '../styles/singlebook.css'

const SingleBook = () => {
   

    const {id} = useParams()
    const [book, setBook] = useState()
    const token = localStorage.getItem('token') 
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user?.role

    useEffect(() => {
        api.get(`api/book/viewbook/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => (
            setBook(res.data.data)
        )).catch((err) => (
            alert('Unable to load book')
        ))
    },[id])

    if (!book) return <p className="text-center mt-5">Loading book details...</p>

    return (
        <div className='background'>
            <div className="single-book-container">
                <div className="book-details-card">
                    <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`} 
                        alt={book.title} 
                        className="book-cover"
                    />
                    <div className="book-info">
                        <h1>{book.title}</h1>
                        <h3>by {book.author}</h3>
                        <p className="book-description">{book.description}</p>
                        <p className="book-meta">
                            <strong>Price:</strong> ₹{book.price} <br />
                            <strong>Stock:</strong> {book.stock} copies
                        </p>
                        {role === 'seller' && (
                            <div className="action-buttons mt-3 d-flex align-items-center justify-content-end flex-column">
                                <Link to={'/updateform'} className='w-100'>
                                    <button className="btn update-btn mb-4 w-100" >Update</button>
                                </Link>
                                <button className="btn delete-btn w-100">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SingleBook
