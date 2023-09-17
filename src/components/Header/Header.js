import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const [isLogged, setIsLogged] = useState(true);

  const menuUnLogin = (
    <nav className='header__auth-container'>
      <Link className='header__link header__link_type_register' to='/signup'>
        Регистрация
      </Link>
      <Link className='header__link header__link_type_login' to='/signin'>
        Войти
      </Link>
    </nav>
  );

  return (
    <header
      className={`header ${
        props.path ? 'header_theme_green' : 'header_theme_black'
      }`}
    >
      <div className='header__container'>
        <Link to='/'>
          <div className='logo button-opacity' />
        </Link>
        {isLogged ? <Navigation /> : menuUnLogin}
      </div>
    </header>
  );
}
