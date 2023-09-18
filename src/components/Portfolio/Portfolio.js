import arrow from '../../images/portfolio__img-arrow.svg';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='link-opacity portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://ivanfedoruschenko.github.io/how-to-learn/'
              target='_blank'
            >
              Статичный сайт
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='link-opacity portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://ivanfedoruschenko.github.io/russian-travel/'
              target='_blank'
            >
              Адаптивный сайт
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
          <li className='link-opacity portfolio__list-element'>
            <a
              className='portfolio__link'
              href='https://github.com/ivanfedoruschenko/react-mesto-api-full-gha'
              target='_blank'
            >
              Одностраничное приложение
              <img className='portfolio__img' src={arrow} alt='Стрелка' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
