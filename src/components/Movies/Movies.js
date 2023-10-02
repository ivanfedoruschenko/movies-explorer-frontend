import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from '../../utils/MainApi';

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
        setSearchText={props.setSearchText}
      />
      <MoviesCardList
        saveMovie={props.saveMovie}
        noResult={props.noResult}
        inSearch={props.inSearch}
        foundedMovies={props.foundedMovies}
        movies={props.movies}
        savedMovies={props.savedMovies}
        isLiked={props.isLiked}
        deleteMovie={props.deleteMovie}
      />
    </main>
  );
}
