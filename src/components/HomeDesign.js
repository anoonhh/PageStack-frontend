import '../styles/style.css'; 

const HomePage = () => {
  return (
    <div className='homepage'>
      {/* Hero Section */}
      <div className='hero-section'>
        <div className='hero-overlay'>
          <h1 className='hero-title'>Welcome to PageStack</h1>
          <p className='hero-subtitle'>
            Discover your next adventure — one page at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
