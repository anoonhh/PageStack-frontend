import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import BrowseProduct from './pages/BrowseProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registration';
import AddBook from './pages/AddForm';
import EditBook from './pages/EditForm';
import SingleBook from './pages/SingleBook';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/books' element={<BrowseProduct/>}/>
        <Route path='/book/:id' element={<SingleBook/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/addform' element={<AddBook/>}/>
        <Route path='/editform' element={<EditBook/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
