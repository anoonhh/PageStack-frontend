import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api.js'
import '../styles/singlebook.css'
import Header from '../components/Header.js'

const SingleBook = () => {
   
    const {id} = useParams()
    const [book, setBook] = useState()
    const token = localStorage.getItem('token') 
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user?.role
    const navigate = useNavigate()

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
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    },[id])

     const handleDelete = async () =>{

        const confirmed = window.confirm("Are you sure want to delete ?")
        if(!confirmed){
            return
        }
        else{
        
            await api.patch(`/api/book/delete/${id}`, {} ,{
                headers:{
                Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                alert('book deleted successfully!')
                navigate('/books')
            }).catch((err) => {
                alert('error deleting book!')
            })
        }
    }

    if (!book) return <p className="text-center mt-5">Loading book details...</p>

    return (
        <div className='background'>
            <div className="single-book-container">
                <Header/>
                <div className="book-details-card mt-5">
                    <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`} 
                        alt={book.title} 
                        className="book-cover"
                    />
                    <div className="book-info">
                        <div>
                            <h1>{book.title}</h1>
                            <h3>by {book.author}</h3>
                            <p className="book-description">{book.description}</p>
                            <p className="book-meta">
                                <strong>Price:</strong> ₹{book.price} <br />
                                <strong>Stock:</strong> {book.stock} copies
                            </p>
                        </div>
                        <div>
                            {role === 'seller' && (
                                <div className="action-buttons mt-3 ">
                                    <Link to={`/editform/${id}`} className='w-100 '>
                                        <button className="btn update-btn mb-4 w-100" >Update</button>
                                    </Link>
                                    <button onClick={handleDelete} className="btn delete-btn w-100">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SingleBook
