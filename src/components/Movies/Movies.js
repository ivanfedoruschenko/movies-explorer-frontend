import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { logDOM } from '@testing-library/react';

export default function Movies(props) {
  return (
    <main className='movies'>
      <SearchForm
        showNoResults={props.showNoResults}
        searchMovie={props.searchMovie}
        checkboxChecked={props.checkboxChecked}
        changeCheckbox={props.changeCheckbox}
        setPreload={props.setPreload}
        shortMovie={props.shortMovie}
        movies={props.foundedMovies}
        searchText={props.searchText}
        error={props.error}
        errorSearch={props.errorSearch}
        setSearchText={props.setSearchText}
      />
      <MoviesCardList
        saveMovie={props.saveMovie}
        noResult={props.noResult}
        inSearch={props.inSearch}
        loggedIn={props.loggedIn}
        foundedMovies={
          props.foundedMovies
            ? props.foundedMovies.filter(
                (movie) => !props.checkboxChecked || movie.duration <= 40
              )
            : []
        }
        movies={props.movies}
        savedMovies={props.savedMovies}
        isLiked={props.isLiked}
        deleteMovie={props.deleteMovie}
      />
    </main>
  );
}
