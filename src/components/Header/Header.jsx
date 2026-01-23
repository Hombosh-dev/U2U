import React, { useState } from 'react';
import './Header.css';
import logoTwo from '../../assets/icons/logo.svg';
import userIconSvg from '../../assets/icons/user.svg';
import SideMenu from '../SideMenu/SideMenu';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const Header = ({ isAuth, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const user = {
    name: "Oleh",
    avatar: "https://placehold.co/48x48"
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">U</span>
            <img src={logoTwo} alt="2" className="logo-img" />
            <span className="logo-text">U</span>
          </div>

          <div className="header-search-desktop">
            <input type="text" className="search-input" />
            <span className="search-icon-wrapper">
                <SearchIcon />
            </span>
          </div>

          <button className="search-btn-mobile mobile-only">
            <SearchIcon />
          </button>
        </div>

        <div className="header-right">
          <nav className="desktop-nav">
            <a href="#" className="nav-link">Добірки</a>
            <a href="#" className="nav-link">AI помічник</a>
            <a href="#" className="nav-link">Про проєкт</a>
          </nav>

          {isAuth ? (
            <div className="user-avatar">
               <img src="https://placehold.co/40x40" alt="User" />
            </div>
          ) : (
            <>
              <div className="auth-buttons-desktop">
                <a href="#" className="auth-link">Вхід</a>
                <a href="#" className="auth-link">Реєстрація</a>
              </div>

              <button className="icon-btn mobile-only">
                <img src={userIconSvg} alt="User" className="user-icon-svg" />
              </button>
            </>
          )}

          <button className="icon-btn menu-btn mobile-only" onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>
      </header>
      <SideMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isAuth={isAuth}
        user={user}
        onLogout={onLogout}
      />
    </>
  );
};

export default Header;