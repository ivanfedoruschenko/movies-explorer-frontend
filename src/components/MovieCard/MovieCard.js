import cardImg from '../../images/movie-card__img.png';
import { useEffect, useState } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Link, useLocation } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

export default function MovieCard({
  movie,
  saveMovie,
  deleteMovie,
  isLiked,
  savedMovies,
  loggedIn,
}) {
  const [liked, setLiked] = useState(isLiked);

  const location = useLocation().pathname;
  function handleLikeClick() {
    if (!liked) {
      saveMovie(movie);
      setLiked(true);
    }
    if (liked) {
      deleteMovie(movie);
      setLiked(false);
    }
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  const likeClassname = `button-opacity movie-card__like ${
    liked
      ? `${
          location === '/movies'
            ? 'movie-card__like_type_active-allMovies'
            : 'movie-card__like_type_active-savedMovies'
        }`
      : 'movie-card__like_type_disable'
  }`;

  useEffect(() => {
    const moviesSave = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    moviesSave.forEach((savedFilm) => {
      if (savedFilm.movieId === movie.id) {
        setLiked(true);
      }
    });
  }, [loggedIn]);

  return (
    <div className='movie-card'>
      <Link to={movie.trailerLink} target='_blank'>
        <img
          className='movie-card__img'
          src={
            movie.image.url
              ? 'https://api.nomoreparties.co' + movie.image.url
              : movie.image
          }
          alt={movie.nameRU}
        />
      </Link>
      <div className='movie-card__container'>
        <h2 className='movie-card__name'>{movie.nameRU}</h2>
        <button onClick={handleLikeClick} className={likeClassname} />
      </div>
      <span className='movie-card__duration'>
        {getTimeFromMins(movie.duration)}
      </span>
    </div>
  );
}
