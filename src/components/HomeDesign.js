// import '../styles/style.css'; 

// const HomePage = () => {
//   return (
//     <div className='homepage'>
//       {/* Hero Section */}
//       <div className='hero-section'>
//         <div className='hero-overlay'>
//           <h1 className='hero-title'>Welcome to PageStack</h1>
//           <p className='hero-subtitle'>
//             Discover your next adventure — one page at a time.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



import '../styles/style.css'; 

const HomePage = () => {
  return (
    <div className='homepage'>
      {/* Hero Section */}
      <div className='hero-section d-flex align-items-center justify-content-center text-center'>
        <div className='hero-overlay container'>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <h1 className='hero-title display-4 fw-bold'>
                Welcome to PageStack
              </h1>
              <p className='hero-subtitle fs-5 mt-3'>
                Discover your next adventure — one page at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
