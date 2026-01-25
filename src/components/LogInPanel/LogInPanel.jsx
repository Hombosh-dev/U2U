import React, { useState } from 'react';
import './LogInPanel.css';

const LogInPanel = ({ onLogin, onClose, onOpenRegister, isOpen = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="header-row">
          <h2 className="login-title">Вхід</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="youtube-section">
          <p><b>Увійдіть за допомогою YouTube</b> та отримайте більше персоналізованих пропозицій!</p>
          <button className="youtube-btn">
            <span className="youtube-icon">▶</span> Увійти через YouTube
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ваша електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="#" className="forgot-link">Забули пароль?</a>

          <div className="social-login">
            <span className="social-text">Або увійдіть через</span>
            <div className="social-buttons">
              <button className="google-btn" title="Увійти через Google" type="button">
                <span className="google-icon">G</span>
              </button>
              <button className="facebook-btn" title="Увійти через Facebook" type="button">
                <span className="facebook-icon">f</span>
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn"><b>Увійти</b></button>
        </form>

        <button
          className="register-link"
          onClick={() => {
            onClose();
            onOpenRegister();
          }}
        >
          <b>Зареєструватись</b>
        </button>
      </div>
    </div>
  );
};

export default LogInPanel;
