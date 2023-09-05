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
              <a className='footer__link' href=''>
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__list-element'>
              <a className='footer__link' href=''>
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
