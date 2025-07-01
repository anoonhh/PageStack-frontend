import '../styles/style.css';


const Header = () => {

  const token = localStorage.getItem('token')

  return (
    <header className="main-header">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 py-2 ">
        
        <div className="logo">
          <h2><a href='/' className='brand px-4'>PageStack</a></h2>
        </div>
       
        <nav className="nav-links mx-4 ">
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
      </div>
    </header>
  );
};

export default Header;
