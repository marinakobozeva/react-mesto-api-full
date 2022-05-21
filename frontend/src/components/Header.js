import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  const location = useLocation();
  const userEmail = props.userEmail;
  const onSignOut = props.onSignOut;

  return (
    <header className='header'>
      <a href="#" target="_blank" rel="noopener">
        <img src={logo} alt="Логотип" className='header__logo' />
      </a>
      {userEmail ? (
        <div className='header__container'>
          <span className='header__user-email'>{userEmail}</span>
          <button className='header__button' onClick={onSignOut}>Выйти</button>
        </div>
      ) : location.pathname === '/signin' ? <Link className='header__link' to='/signup'>Регистрация</Link> : <Link className='header__link' to='/signin'>Войти</Link>}
    </header>
  )
}

export default Header;