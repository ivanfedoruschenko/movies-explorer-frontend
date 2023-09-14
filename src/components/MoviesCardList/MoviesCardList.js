import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList() {
  return (
    <section className='movies-list'>
      {/*<p className='movies-list__no-find'>Ничего не найдено</p> */}
      <div className='movies-list__container'>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <button className='movies-list__button'>Ещё</button>
    </section>
  );
}
