import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import iconCross from '../../images/navigation__icon-cross.svg';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClassName = ({ isActive }) =>
    'link-opacity navigation__link navigation__link_vision_main ' +
    (isActive ? 'active' : '');
  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navigation ${isOpen ? 'navigation_opened' : ''}`}>
      <button className='navigation__button' onClick={handleMenuOpen}></button>
      <div
        className={`navigation__container ${
          isOpen && 'navigation__container_opened'
        }`}
      >
        <button
          className='button-opacity navigation__icon-cross'
          type='button'
          onClick={handleMenuOpen}
        />
        <div className='navigation__navbar'>
          <NavLink className={navLinkClassName} to='/'>
            Главная
          </NavLink>
          <NavLink className={navLinkClassName} to='/movies'>
            Фильмы
          </NavLink>
          <NavLink className={navLinkClassName} to='/saved-movies'>
            Сохраненные фильмы
          </NavLink>
        </div>
        <Link className='link-opacity navigation__link-profile' to='/profile'>
          Аккаунт
          <div className='navigation__profile-icon'></div>
        </Link>
      </div>
    </nav>
  );
}
