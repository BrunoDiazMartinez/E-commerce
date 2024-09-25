import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <img className="header__logo" src="./img/Logo.png" alt="logoTipo" />
      </a>
    </header>
  );
};

export default Header;
