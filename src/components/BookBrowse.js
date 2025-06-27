import { useEffect, useState } from 'react'
import '../styles/browse.css'
import api from '../api.js'
import {Link, useNavigate } from 'react-router-dom'
import Header from './Header.js'

const BookBrowse = () => {
    const [book , setBook] = useState([])
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem("user"))
    const role = user?.role

    //pagination
    const[page, setPage] = useState(1)
    const[total, setTotal] = useState(0)

    const limit = 4
    const skip = (page - 1) * limit
    const totalPages = Math.ceil(total / limit)

    

    useEffect(() => {
        api.get(`/api/book?limit=${limit}&skip=${skip}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setBook(res.data.data)
            setTotal(res.data.total)
        })
        .catch((error) => {
         
          alert('Error fetching books');
      });
    }, [page]);

    


// const navigate = useNavigate()
// const handleClick = (id) => {
//  navigate(`/${id}`)
// }

  return (
    <div className='browse'>
        <div className='overlay '>
            <Header/>
                <h1 className='text-center '>Explore the World of Words</h1>
            <div>
                      <div className="browse-page">
                         {role === 'seller' && (
                                <div className=" mb-5 mx-2 text-end">
                                <Link to="/addform" className="btn" style={{
                                    backgroundColor: 'rgb(181 138 164)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    boxShadow: 'rgb(71 71 68) 0px 4px 12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    }}>+ Add New Book</Link>
                                </div>
                            )}
                            
                            <div className="book-grid">
                                {book.map((b) => (
                                <Link to={`/book/${b._id}`} key={b._id} className="book-card">
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${b.image}`} alt={b.title} />
                                    <div className="book-details">
                                    <h2>{b.title}</h2>
                                    <h4>{b.author}</h4>
                                    <p>{b.descrition}</p>
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>
                {/* <div className='container'>
                    <div className='row'>
                        { book.map((b) => (
                            <div className='col-md-3 book-card ' key={b.id} onClick={() => handleClick(b.id)}>
                                <img src={b.image} alt={b.title}/>
                                <h2>{b.title}</h2>
                                <h4>{b.author}</h4>
                                <p>{b.descrition}</p>
                            </div>
                        ))}
                </div>
            </div> */}
        </div>

        {/* pagination button */}
        <div className="pagination pb-5">
            <button
                className='btn me-2'
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1)}
            >
                Prev
            </button>
            
            <span>Page {page} of {totalPages}</span>

            <button
                className='btn ms-2'
                disabled={page === totalPages}
                onClick={() => setPage(prev => prev + 1)}
            >
                Next
            </button>
            </div>



    </div>
    </div>
  )
}

export default BookBrowse