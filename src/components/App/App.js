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

function App() {
  const [movies, setMovies] = React.useState([]);
  const [foundedMovies, setFoundedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [checkboxAllChecked, setCheckboxAllChecked] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [error, setError] = React.useState(true);
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
    localStorage.setItem('searchSaveMovieValue', value);
    if (value.length === 0) {
      setError(true);
      setErrorSearch('Нужно ввести ключевое слово');
    } else {
      setError(false);
      const foundMovies = savedMovies.filter((searchMovie) => {
        return (
          searchMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          searchMovie.nameEN.toLowerCase().includes(value.toLowerCase())
        );
      });
      localStorage.setItem('searchSaveMovies', JSON.stringify(foundMovies));
      setSavedMovies(
        JSON.parse(localStorage.getItem('searchSaveMovies')) || []
      );
    }
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    setMovies(JSON.parse(localStorage.getItem('movies')) || []);

    if (savedMovies.length === 0) {
      setNoResult(true);
    }
    setNoResult(false);
  }

  function searchMovie(value) {
    localStorage.setItem('searchMovieValue', value);
    localStorage.setItem(
      'allMovieSearchValue',
      JSON.stringify(searchTextMovie)
    );
    localStorage.setItem(
      'savedMovieSearchValue',
      JSON.stringify(searchTextSavedMovie)
    );
    moviesApi
      .getMovies()
      .then((res) => {
        if (value === '') {
          setError(true);
          setErrorSearch('Нужно ввести ключевое слово');
        } else {
          if (res.length === 0) {
            setNoResult(true);
          } else {
            setNoResult(false);
            setError(false);
            const foundMovies = res.filter((movie) => {
              return movie.nameRU.toLowerCase().includes(value.toLowerCase());
            });
            localStorage.setItem(
              'searchAllMovies',
              JSON.stringify(foundMovies)
            );
            setFoundedMovies(foundMovies);

            localStorage.setItem('movies', JSON.stringify(res));
            setMovies(JSON.parse(localStorage.getItem('movies')) || []);
          }
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleChangeAllCheckbox(e) {
    setCheckboxAllChecked(e.target.checked);
    localStorage.setItem('checkboxAllShort', JSON.stringify(e.target.checked));
  }

  function handleChangeSaveCheckbox(e) {
    setCheckboxSaveChecked(e.target.checked);
    localStorage.setItem('checkboxSaveShort', JSON.stringify(e.target.checked));
  }

  function setPreload() {
    setInSearch(true);
    setTimeout(() => {
      setInSearch(false);
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
        setEditProfile(false);
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
          movieId: data.duration,
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
        setIsLiked(true);
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
        const newMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const newSavedMovies = newMovies.filter((c) => c._id !== movie._id);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        if (isLiked) {
          setSavedMovies(newSavedMovies);
        } else {
          setIsLiked(false);
        }
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
          setSearchTextSavedMovie(
            JSON.parse(localStorage.getItem('savedMovieSearchValue'))
          );
          setSearchTextMovie(
            JSON.parse(localStorage.getItem('allMovieSearchValue')) || ''
          );
          setCheckboxAllChecked(
            JSON.parse(localStorage.getItem('checkboxAllShort')) || false
          );
          setCheckboxSaveChecked(
            JSON.parse(localStorage.getItem('checkboxSaveShort')) || false
          );
          localStorage.setItem('savedMovies', JSON.stringify(movies));
          navigate('/movies', { replace: true });
        })
        .catch((err) => {
          console.error(`Произошла ошибка ${err}`);
        });
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, [loggedIn]);

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
              <Register
                onRegisterUser={handleRegisterUser}
                error={error}
                setError={setError}
                errorText={errorTextRegister}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                onLoginUser={handleLoginUser}
                error={error}
                setError={setError}
                errorText={errorTextLogin}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                error={error}
                isEdit={editProfile}
                editProfile={handleEditProfile}
                signOut={signOut}
                setError={setError}
                errorText={errorTextUpdate}
                path='/profile'
              />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                element={Movies}
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
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
                path='/movies'
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                errorSearch={errorSearch}
                path='/saved-movies'
                error={error}
                inSearch={inSearch}
                searchMovie={searchSaveMovie}
                changeCheckbox={handleChangeSaveCheckbox}
                setPreload={setPreload}
                movies={movies}
                isLiked={isLiked}
                checkboxChecked={checkboxSaveChecked}
                searchText={searchTextSavedMovie}
                setSearchText={setSearchTextSavedMovie}
                foundedMovies={savedMovies}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
              />
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
