import './app.css';
import React, { useCallback, useEffect } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRouteElement from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import Auth from '../../utils/auth';

function App() {
  const [movies, setMovies] = React.useState([]);
  const [foundedMovies, setFoundedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [checkboxAllChecked, setCheckboxAllChecked] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [error, setError] = React.useState(false);
  const [errorTextRegister, setErrorTextRegister] = React.useState('');
  const [errorTextLogin, setErrorTextLogin] = React.useState('');
  const [errorTextUpdate, setErrorTextUpdate] = React.useState('');
  const [editProfile, setEditProfile] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [inSearch, setInSearch] = React.useState(false);
  const [noResult, setNoResult] = React.useState(false);
  const [checkboxSaveChecked, setCheckboxSaveChecked] = React.useState(false);
  const [searchTextMovie, setSearchTextMovie] = React.useState('');
  const [searchTextSavedMovie, setSearchTextSavedMovie] = React.useState('');
  const [errorSearch, setErrorSearch] = React.useState('');
  const [confirmation, setConfirmation] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(
    JSON.parse(localStorage.getItem('login'))
  );

  const location = useLocation();
  const navigate = useNavigate();
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

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    });
    navigate('/', { replace: true });
  }

  function searchSaveMovie(value) {
    if (value === null || value === '') {
      setError(true);
      setErrorSearch('Нужно ввести ключевое слово');
    } else {
      localStorage.setItem('searchSaveMovieValue', value);
      setPreload();
      const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const foundMovies = allSavedMovies.filter((searchMovie) => {
        return (
          searchMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          searchMovie.nameEN.toLowerCase().includes(value.toLowerCase())
        );
      });
      if (foundMovies.length === 0) {
        setNoResult(true);
      } else {
        setError(false);
        setNoResult(false);
        localStorage.setItem('searchSaveMovies', JSON.stringify(foundMovies));
        setSavedMovies(foundMovies);
      }
      setMovies(JSON.parse(localStorage.getItem('movies')) || []);
    }
  }

  function searchMovie(value) {
    if (value === '') {
      setError(true);
      setErrorSearch('Нужно ввести ключевое слово');
    } else {
      setPreload();
      localStorage.setItem('searchMovieValue', value);
      localStorage.setItem(
        'allMovieSearchValue',
        JSON.stringify(searchTextMovie)
      );
      moviesApi
        .getMovies()
        .then((res) => {
          const foundMovies = res.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(value.toLowerCase());
          });
          if (foundMovies.length === 0) {
            setNoResult(true);
          } else {
            setNoResult(false);
            setError(false);
            localStorage.setItem(
              'searchAllMovies',
              JSON.stringify(foundMovies)
            );
            setFoundedMovies(foundMovies);

            localStorage.setItem('movies', JSON.stringify(res));
            setMovies(JSON.parse(localStorage.getItem('movies')) || []);
          }
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }

  function handleChangeAllCheckbox(e) {
    setCheckboxAllChecked(e.target.checked);
    localStorage.setItem('checkboxAllShort', JSON.stringify(e.target.checked));
  }

  function handleChangeSaveCheckbox(e) {
    setCheckboxSaveChecked(e.target.checked);
  }

  function setPreload() {
    setInSearch(true);
    setTimeout(() => {
      setInSearch(false);
    }, 1000);
  }

  function setConfirm() {
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
      setEditProfile(false);
    }, 1000);
  }

  const handleRegisterUser = (data) => {
    const { name, email, password } = data;
    mainApi
      .register(name, email, password)
      .then((response) => {
        if (response) {
          setCurrentUser({
            name: response.name,
            email: response.email,
          });
          handleLoginUser({ email, password });
          navigate('/movies', { replace: true });
          setError(false);
        }
      })
      .catch((error) => {
        setErrorTextRegister('');
        setError(true);
        if (error === 'Ошибка: 409') {
          setErrorTextRegister(
            'При регистрации указан email, который уже существует'
          );
        }
        if (error === `Ошибка: 500`) {
          setErrorTextRegister('Введенные данные некорректны');
        }
      });
  };

  const handleUpdateUser = (data) => {
    mainApi
      .patchUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setConfirm();
      })
      .catch((error) => {
        setErrorTextUpdate('');
        setError(true);
        setErrorTextUpdate('Введенные данные некорректны');
      });
  };

  function saveMovie(data) {
    mainApi
      .saveMovies(
        {
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: 'https://api.nomoreparties.co' + data.image.url,
          trailer: data.trailerLink,
          thumbnail:
            'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
        },
        localStorage.token
      )
      .then((film) => {
        const moviesSaved = JSON.parse(
          localStorage.getItem('savedMovies') || []
        );
        setSavedMovies([film, ...moviesSaved]);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([film, ...moviesSaved])
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  function deleteMovie(movie) {
    const deletedMovie = movie.movieId
      ? savedMovies.find((film) => film.movieId === movie.movieId)
      : savedMovies.find((film) => film.id === movie.movieId);
    mainApi
      .deleteMovie(deletedMovie._id, localStorage.token)
      .then((movie) => {
        const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const newSavedMovies = allSavedMovies.filter(
          (c) => c._id !== movie._id
        );
        const newFilteredMovies = savedMovies.filter(
          (c) => c._id !== movie._id
        );
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newFilteredMovies);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  const handleLoginUser = (data) => {
    const { email, password } = data;
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);

          setError(false);
        }
      })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('login', JSON.stringify(loggedIn));
        setIsLogin(true);
        navigate('/movies', { replace: true });
      })
      .catch((error) => {
        setErrorTextLogin('');
        setError(true);
        setErrorTextLogin('Неверный логин или пароль');
      });
  };

  React.useEffect(() => {
    if (localStorage.token) {
      Promise.all([
        mainApi.getUserInfo(localStorage.token),
        mainApi.getSavedMovies(localStorage.token),
      ])
        .then(([user, movies]) => {
          setSavedMovies(movies);
          setCurrentUser(user);
          setLoggedIn(true);
          localStorage.setItem('login', JSON.stringify(loggedIn));
          setSearchTextMovie(
            JSON.parse(localStorage.getItem('allMovieSearchValue')) || ''
          );
          setCheckboxAllChecked(
            JSON.parse(localStorage.getItem('checkboxAllShort')) || false
          );
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.error(`Произошла ошибка ${err}`);
        });
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('stateIsLogin', JSON.stringify(isLogin));
  }, [isLogin]);

  React.useEffect(() => {
    setFoundedMovies(JSON.parse(localStorage.getItem('searchAllMovies')));
  }, [checkboxAllChecked]);

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        {pathHeader && <Header loggedIn={loggedIn} path={pathHeaderGreen} />}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/signup'
            element={
              <Auth loggedIn={loggedIn}>
                <Register
                  onRegisterUser={handleRegisterUser}
                  error={error}
                  setError={setError}
                  errorText={errorTextRegister}
                />
              </Auth>
            }
          />
          <Route
            path='/signin'
            element={
              <Auth loggedIn={loggedIn}>
                <Login
                  onLoginUser={handleLoginUser}
                  error={error}
                  setError={setError}
                  errorText={errorTextLogin}
                />
              </Auth>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  error={error}
                  isEdit={editProfile}
                  editProfile={handleEditProfile}
                  signOut={signOut}
                  setError={setError}
                  errorText={errorTextUpdate}
                  confirmation={confirmation}
                  path='/profile'
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement loggedIn={isLogin}>
                <Movies
                  loggedIn={loggedIn}
                  inSearch={inSearch}
                  searchMovie={searchMovie}
                  errorSearch={errorSearch}
                  checkboxChecked={checkboxAllChecked}
                  changeCheckbox={handleChangeAllCheckbox}
                  setPreload={setPreload}
                  error={error}
                  noResult={noResult}
                  searchText={searchTextMovie}
                  setSearchText={setSearchTextMovie}
                  foundedMovies={foundedMovies}
                  saveMovie={saveMovie}
                  isLiked={isLiked}
                  setError={setError}
                  savedMovies={savedMovies}
                  deleteMovie={deleteMovie}
                  path='/movies'
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement loggedIn={isLogin}>
                <SavedMovies
                  setError={setError}
                  loggedIn={loggedIn}
                  noResult={noResult}
                  errorSearch={errorSearch}
                  path='/saved-movies'
                  error={error}
                  inSearch={inSearch}
                  searchMovie={searchSaveMovie}
                  changeCheckbox={handleChangeSaveCheckbox}
                  setPreload={setPreload}
                  movies={movies}
                  isLiked={true}
                  checkboxChecked={checkboxSaveChecked}
                  searchText={searchTextSavedMovie}
                  setSearchText={setSearchTextSavedMovie}
                  savedMovies={savedMovies}
                  foundedMovies={savedMovies}
                  deleteMovie={deleteMovie}
                />
              </ProtectedRouteElement>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {pathFooter && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
