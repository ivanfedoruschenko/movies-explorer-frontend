import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const movieStep = () => {
  if (window.screen.width < 768) {
    return 5;
  }
  if (window.screen.width >= 768 && window.screen.width < 922) {
    return 8;
  }
  if (window.screen.width >= 922 && window.screen.width <= 1237) {
    return 12;
  }
  if (window.screen.width > 1237) {
    return 16;
  }
};

const movieNextStep = () => {
  if (window.screen.width < 922) {
    return 2;
  }
  if (window.screen.width >= 922 && window.screen.width <= 1237) {
    return 3;
  }
  if (window.screen.width >= 1237) {
    return 4;
  }
};

export default function MoviesCardList({
  saveMovie,
  deleteMovie,
  savedMovies,
  isLiked,
  inSearch,
  foundedMovies,
  noResult,
  loggedIn,
}) {
  const [showMovies, setShowMovies] = useState(
    foundedMovies.slice(0, movieStep())
  );
  const [nextStep, setNextStep] = useState(movieNextStep);

  function showMore() {
    setShowMovies(foundedMovies.slice(0, nextStep + movieStep()));
    setNextStep(nextStep + movieNextStep());
  }

  useEffect(() => {
    setShowMovies(foundedMovies.slice(0, movieStep()));
  }, [foundedMovies]);

  return (
    <section className='movies-list'>
      {inSearch ? (
        <Preloader />
      ) : noResult ? (
        <p className='movies-list__no-find'>Ничего не найдено</p>
      ) : (
        <ul className='movies-list__container'>
          {showMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id ?? movie.movieId}
                loggedIn={loggedIn}
                saveMovie={saveMovie}
                movie={movie}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
                isLiked={isLiked}
              />
            );
          })}
        </ul>
      )}
      {foundedMovies.length > nextStep && !inSearch && !noResult && (
        <button
          type='button'
          onClick={showMore}
          className='button-opacity movies-list__button'
        >
          Ещё
        </button>
      )}
    </section>
  );
}
