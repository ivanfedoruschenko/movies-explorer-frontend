import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  const menuUnLogin = (
    <div className='header__auth-container'>
      <Link className='header__link header__link_type_register' to='/sign-up'>
        Регистрация
      </Link>
      <Link className='header__link header__link_type_login' to='/sign-in'>
        Войти
      </Link>
    </div>
  );

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'>
          <div className='logo' alt='Лого' />
        </Link>
        {isLogged ? <Navigation /> : menuUnLogin}
      </div>
    </header>
  );
}
