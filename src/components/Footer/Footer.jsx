import React from 'react';
import './Footer.css';
import logoTwo from '../../assets/icons/logo.svg'; 
import fbIcon from '../../assets/icons/facebook.svg';
import instaIcon from '../../assets/icons/instagram.svg';
import tgIcon from '../../assets/icons/telegram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-letter">U</span>
            <img src={logoTwo} alt="2" className="logo-img-center" />
            <span className="logo-letter">U</span>
          </div>
          <p className="brand-slogan">Ukrainians to Ukrainians</p>
        </div>
        <div className="footer-social-block">
          <p className="social-text">
            Підтримуй українське!<br />
            Шукай нас у соцмережах!
          </p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noreferrer"><img src={fbIcon} alt="Facebook" /></a>
            <a href="#" target="_blank" rel="noreferrer"><img src={instaIcon} alt="Instagram" /></a>
            <a href="#" target="_blank" rel="noreferrer"><img src={tgIcon} alt="Telegram" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;