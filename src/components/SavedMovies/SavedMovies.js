import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
