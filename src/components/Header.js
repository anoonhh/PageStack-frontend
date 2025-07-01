import '../styles/style.css';


const Header = () => {

  const token = localStorage.getItem('token')

  return (
    <header className="main-header">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 py-2 ">
        
        <div className="logo">
          <h2><a href='/' className='brand px-4'>PageStack</a></h2>
        </div>

        {/* Hamburger Toggle
          <button
            className="navbar-toggler d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navLinks"
            aria-controls="navLinks"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars"></i>
          </button> */}
       
        <nav className="nav-links  collapse d-md-flex mx-2" id="navLinks">
          {!token ? (
            <>
              <a href='/' className='nav-item px-2'>Home</a>
              <a href='/login' className='nav-item px-2'><i class="fa-solid fa-user"></i></a>
            </>
            
          ) : (
            <>
              <a href='/books' className='nav-item px-2'>Browse</a>
              <a href='/viewprofile' className='nav-item px-2'><i class="fa-solid fa-user"></i></a>
            </>
          )}
         
        </nav> 

         {/* Mobile Dropdown */}
        <div className="dropdown d-md-none">
          <button
            className="btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {!token ? (
              <>
                <li><a className="dropdown-item" href="/">Home</a></li>
                <li><a className="dropdown-item" href="/login"><i className="fa-solid fa-user"></i> Login</a></li>
              </>
            ) : (
              <>
                <li><a className="dropdown-item" href="/books">Browse</a></li>
                <li><a className="dropdown-item" href="/viewprofile"> Profile</a></li>
              </>
            )}
          </ul>
        </div> 
      </div>
    </header>
  );
};

export default Header;
