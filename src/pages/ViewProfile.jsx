import { useEffect, useState } from 'react';
import '../styles/browse.css';
import api from '../api.js';
import Header from '../components/Header.js';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {

    const [user, setUser] = useState()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/viewprofile',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setUser(res.data.data)
        }).catch((err) => {
            alert("Error fetching profile data!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/')
      
    }

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className='browse'>
      <div className='overlay'>
        <Header/>
        <h1 className='text-center ' style={{paddingTop:'150px'}}>Your Profile</h1>
        <div className='browse-page d-flex justify-content-center'>
          <div className="profile-card" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 'rgb(71 71 68) 0px 4px 12px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div className='d-flex align-items-center justify-content-between px-3 mt-2'>
                <a href='/updateprofile' style={{color: 'grey'}}>
                     <i class="fa-solid fa-user-pen"></i>
                </a>
                <button style={{color: 'grey', border:'none'}} onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
            
            <div className='text-center mb-4'>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${user.image }`}
                alt='Profile'
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              />
            </div>
            <h2 className='text-center'>{user.name}</h2>
            <h4 className='text-center text-muted mb-3'>{user.role}</h4>
            <div style={{ lineHeight: '2rem' }}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
