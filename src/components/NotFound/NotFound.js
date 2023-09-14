import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <Link className='not-found__button' to='/'>
        Назад
      </Link>
    </main>
  );
}
