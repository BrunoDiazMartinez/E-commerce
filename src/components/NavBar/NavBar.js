import React from 'react';
import './NavBar.css';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  if (location.pathname === '/confirmacion') {
    return null; // Si estamos en la página de confirmación, no mostrar el Navbar
  }
  return (
    <nav className="navegacion">
      <a href="/" className="navegacion__enlace">Tienda</a>
      <a href="/carrito" id="boton-carrito" className="boton-carrito">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-filled" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z"
            strokeWidth="0" fill="currentColor"
          />
        </svg>
      </a>
    </nav>
  );
};

export default NavBar;
