import arrow from '../../images/portfolio__img-arrow.png';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://ivanfedoruschenko.github.io/how-to-learn/'
            >
              Статичный сайт
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://ivanfedoruschenko.github.io/russian-travel/'
            >
              Адаптивный сайт
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://ivanfedoruschenko.github.io/react-mesto-auth/'
            >
              Одностраничное приложение
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
