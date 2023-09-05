import imgPhoto from '../../images/about-me__img.jpeg';
import { Link } from 'react-router-dom';

export default function AboutMe() {
  return (
    <div className='about-me'>
      <div className='about-me__container'>
        <h2 className='title-block'>Студент</h2>
        <div className='about-me__wrapper'>
          <div className='about-me__text-container'>
            <h3 className='about-me__name'>Иван</h3>
            <p className='about-me__direction'>Фронтенд-разработчик, 29 лет</p>
            <p className='about-me__info'>
              Родился в Приморье, живу в Питере. Имею 2 высших инженерных
              образования. После 6 лет в логистике пришел в разработку, и там
              понеслось. Есть жена и сын. Люблю разбираться в сложных и
              непонятных вещах.
            </p>
            <a
              href='https://github.com/ivanfedoruschenko'
              className='about-me__link'
            >
              Github
            </a>
          </div>
          <img src={imgPhoto} className='about-me__img' alt='' />
        </div>
      </div>
    </div>
  );
}