import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import {
  SCREEN_MOBILE,
  SCREEN_LAPTOP,
  SCREEN_DESKTOP,
  STEP_MOBILE,
  STEP_LAPTOP,
  STEP_DESKTOP,
  DEFAULT_MOBILE,
  DEFAULT_LAPTOP,
  DEFAULT_LAPTOP_WIDE,
  DEFAULT_DESKTOP,
} from '../../utils/constants';

const movieStep = () => {
  if (window.screen.width < SCREEN_MOBILE) {
    return DEFAULT_MOBILE;
  }
  if (
    window.screen.width >= SCREEN_MOBILE &&
    window.screen.width < SCREEN_LAPTOP
  ) {
    return DEFAULT_LAPTOP;
  }
  if (
    window.screen.width >= SCREEN_LAPTOP &&
    window.screen.width <= SCREEN_DESKTOP
  ) {
    return DEFAULT_LAPTOP_WIDE;
  }
  if (window.screen.width > SCREEN_DESKTOP) {
    return DEFAULT_DESKTOP;
  }
};

const movieNextStep = () => {
  if (window.screen.width < SCREEN_LAPTOP) {
    return STEP_MOBILE;
  }
  if (
    window.screen.width >= SCREEN_LAPTOP &&
    window.screen.width <= SCREEN_DESKTOP
  ) {
    return STEP_LAPTOP;
  }
  if (window.screen.width >= SCREEN_DESKTOP) {
    return STEP_DESKTOP;
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
    setShowMovies(
      foundedMovies.slice(0, nextStep + movieStep() - movieNextStep())
    );
  }, [foundedMovies]);

  useEffect(() => {
    setShowMovies(foundedMovies.slice(0, movieStep()));
  }, []);

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
      {foundedMovies.length > showMovies.length && !inSearch && !noResult && (
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
