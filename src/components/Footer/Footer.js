export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <h4 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className='footer__text-wrapper'>
          <p className='footer__copyright'>&copy; 2023</p>
          <ul className='footer__list'>
            <li className='footer__list-element'>
              <a
                className='link-opacity footer__link'
                href='https://practicum.yandex.ru/'
                target='_blank'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__list-element'>
              <a
                className='link-opacity footer__link'
                href='https://github.com/ivanfedoruschenko'
                target='_blank'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
