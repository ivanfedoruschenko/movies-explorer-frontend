import { Link } from 'react-router-dom';
import { useState } from 'react';
import iconCross from '../../images/navigation__icon-cross.svg';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navigation ${isOpen && 'navigation_opened'}`}>
      <button className='navigation__button' onClick={handleMenuOpen}></button>
      <div
        className={`navigation__container ${
          isOpen && 'navigation__container_opened'
        }`}
      >
        <img
          className='navigation__icon-cross'
          src={iconCross}
          alt='Крестик'
          onClick={handleMenuOpen}
        />
        <div className='navigation__navbar'>
          <Link className='navigation__link' to='/'>
            Главная
          </Link>
          <Link className='navigation__link' to='/movies'>
            Фильмы
          </Link>
          <Link className='navigation__link' to='/saved-movies'>
            Сохраненные фильмы
          </Link>
        </div>
        <Link className='navigation__link' to='/profile'>
          Акаунт
          <div className='navigation__profile-icon'></div>
        </Link>
      </div>
    </div>
  );
}
