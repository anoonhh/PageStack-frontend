
import React from 'react';
import '../styles/style.css'; // Ensure you add the CSS below
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 py-2 ">
        <div className="logo">
          <h2><a href='/' className='brand px-4'>PageStack</a></h2>
        </div>
        <nav className="nav-links mx-4 ">
          <a href='/' className='nav-item px-2'>Home</a>
          <a href='/login' className='nav-item px-2'><i class="fa-solid fa-user"></i></a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
