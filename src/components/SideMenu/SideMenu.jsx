import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const CloseIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const ArrowIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
);
const LogoutIcon = () => (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
);

import UserPlaceholderIcon from '../../assets/icons/user.svg';

const SideMenu = ({ isOpen, isAuth, user, onClose, onLogout, onOpenLogin }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`sidemenu-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="sidemenu-panel" onClick={handlePanelClick}>
        <div>
          <div className="sidemenu-header">
            <button className="sidemenu-close-btn" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          {isAuth ? (
            <Link to="/account" className="sidemenu-user-section" onClick={onClose}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="sidemenu-user-avatar" />
              ) : (
                <img src={UserPlaceholderIcon} alt="User Icon" className="sidemenu-user-avatar sidemenu-user-avatar-placeholder" />
              )}
              <span className="sidemenu-user-name">{user.name}</span>
              <ArrowIcon />
            </Link>
          ) : (
            <button
              type="button"
              className="sidemenu-login-section"
              onClick={() => {
                onClose();
                if (onOpenLogin) onOpenLogin();
              }}
            >
              <span className="sidemenu-user-name">Вхід в акаунт</span>
              <ArrowIcon />
            </button>
          )}

          <nav className="sidemenu-nav">
            <Link to="/" className="sidemenu-nav-link" onClick={onClose}>
              <span>Головна</span>
              <ArrowIcon />
            </Link>
            <Link to="/collections" className="sidemenu-nav-link" onClick={onClose}>
              <span>Тематичні добірки</span>
              <ArrowIcon />
            </Link>
            <Link to="/channels" className="sidemenu-nav-link" onClick={onClose}>
              <span>Список каналів</span>
              <ArrowIcon />
            </Link>
            <Link to="/about" className="sidemenu-nav-link" onClick={onClose}>
              <span>Про проєкт</span>
              <ArrowIcon />
            </Link>
          </nav>
        </div>

        <div className="sidemenu-footer">
          {isAuth && (
            <button className="sidemenu-logout-btn" onClick={onLogout}>
              <span>Вийти</span>
              <LogoutIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
