import './app.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import AuthWindow from '../AuthWindow/AuthWIndow';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const location = useLocation();

  return (
    <div className='app'>
      {location.pathname !== '/sign-up' && location.pathname !== '/sign-in' && (
        <Header />
      )}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
      </Routes>
      {location.pathname !== '/sign-up' && location.pathname !== '/sign-in' && (
        <Footer />
      )}
    </div>
  );
}

export default App;
