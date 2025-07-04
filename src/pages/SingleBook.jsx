
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api.js'
import '../styles/singlebook.css'
import Header from '../components/Header.js'

const SingleBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState()
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user?.role
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`api/book/viewbook/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setBook(res.data.data))
        .catch((err) => alert('Unable to load book'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure want to delete?")
        if (!confirmed) return

        await api.patch(`/api/book/delete/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert('Book deleted successfully!')
            navigate('/books')
        })
        .catch(() => alert('Error deleting book!'))
    }

    if (!book) return <p className="text-center mt-5">Loading book details...</p>

    return (
        <div className="background">
            {/* <div className='single-book-container'> */}
             <Header />
            <div className="container  min-vh-100 d-flex justify-content-center align-items-center">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="card shadow-lg p-4" style={{borderRadius: '20px', marginBottom:'100px' , marginTop:'150px'}}>
                            <div className="row g-4">
                                <div className="col-md-5 text-center">
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`}
                                        alt={book.title}
                                        className="img-fluid rounded book-cover"
                                    />
                                </div>
                                <div className="col-md-7 p-3">
                                    <h2 className="fw-bold pt-3">{book.title}</h2>
                                    <h5 className="text-muted">by {book.author}</h5>
                                    <p className="mt-3">{book.description}</p>
                                    <p className="mt-3">
                                        <strong>Price:</strong> ₹{book.price} <br />
                                        <strong>Stock:</strong> {book.stock} copies
                                    </p>

                                    {role === 'seller' && (
                                        <div className="d-grid gap-2 mt-4">
                                            <Link to={`/editform/${id}`}>
                                                <button className="btn update-btn w-100 mb-2">Update</button>
                                            </Link>
                                            <button onClick={handleDelete} className="btn delete-btn w-100">Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    // </div>
    )
}

export default SingleBook

