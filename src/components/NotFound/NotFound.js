import { useNavigate } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

export default function NotFound() {
  const backButton = useNavigate();
  const previousPage = () => backButton(-1);

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button
        type='button'
        className='not-found__button'
        onClick={previousPage}
      >
        Назад
      </button>
    </main>
  );
}
