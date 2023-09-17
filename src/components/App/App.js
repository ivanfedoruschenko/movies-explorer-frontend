import './app.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { Route, Routes, useLocation } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const location = useLocation();

  const pathHeaderGreen = location.pathname === '/';

  const pathHeader =
    location.pathname === '/' ||
    location.pathname === '/profile' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  const pathFooter =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies';

  return (
    <div className='app'>
      {pathHeader && <Header path={pathHeaderGreen} />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {pathFooter && <Footer />}
    </div>
  );
}

export default App;
