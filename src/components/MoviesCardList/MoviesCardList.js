import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList() {
  return (
    <section className='movies-list'>
      {/*<p className='movies-list__no-find'>Ничего не найдено</p> */}
      <ul className='movies-list__container'>
        <MovieCard name='33 пингвина' />
        <MovieCard name='33 пингвина' />
        <MovieCard name='33 пингвина' />
        <MovieCard name='33 пингвина' />
      </ul>
      <button className='button-opacity movies-list__button'>Ещё</button>
    </section>
  );
}
