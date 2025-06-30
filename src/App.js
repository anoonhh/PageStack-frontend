import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import BrowseProduct from './pages/BrowseProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registration';
import AddBook from './pages/AddForm';
import EditBook from './pages/EditForm';
import SingleBook from './pages/SingleBook';
import ViewProfile from './pages/ViewProfile';
import UpdatProfile from './pages/UpdatProfile';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route 
          path='/login' 
          element={
            <PublicRoute>
              <LoginPage/>
            </PublicRoute>
          }/>

        <Route 
          path='/registration' 
          element={
            <PublicRoute>
              <Registration/>
            </PublicRoute>
          }/>

        <Route 
          path='/books' 
          element={
            <PrivateRoute>
              <BrowseProduct/>
            </PrivateRoute>
          }/>

        <Route 
          path='/book/:id' 
          element={
            <PrivateRoute>
              <SingleBook/>
            </PrivateRoute>
          }/>

        <Route 
          path='/addform' 
          element={
            <PrivateRoute>
              <AddBook/>
            </PrivateRoute>
          }/>

        <Route 
          path='/editform/:id' 
          element={
            <PrivateRoute>
              <EditBook/>
            </PrivateRoute>
          }/>

        <Route 
          path='/viewprofile'   
          element={
            <PrivateRoute>
              <ViewProfile/>
            </PrivateRoute>
          }/>
        <Route 
          path='/updateprofile' 
          element={
            <PrivateRoute>
              <UpdatProfile/>
            </PrivateRoute>
          }/>
      </Routes>
    
    </div>
  );
}

export default App;
