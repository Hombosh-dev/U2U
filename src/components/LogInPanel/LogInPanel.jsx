import React, { useState } from "react";
import "./LogInPanel.css";
import youtubeIcon from "../../assets/icons/youtube_3.svg"; // svg asset

function LogInPanel({ onLogin, onClose, onOpenRegister, isOpen = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("[LOGIN] User clicked 'Увійти' (demo login).", { email, password });
    if (onLogin) onLogin({ email, password });
    if (onClose) onClose();
  };

  const handleOpenRegister = () => {
    console.log("[LOGIN] User clicked 'Зареєструватись' -> open Registration.");
    if (onClose) onClose();
    if (onOpenRegister) onOpenRegister();
  };

  if (!isOpen) return null;

  return (
    <div className="loginOverlay" onMouseDown={onClose}>
      <div className="loginCard" onMouseDown={(e) => e.stopPropagation()}>
        <button className="loginClose" type="button" onClick={onClose} aria-label="Close">
          <span className="loginCloseIcon">×</span>
        </button>

        <h2 className="loginTitle">Вхід</h2>

        <div className="loginInfoBox">
          <div className="loginInfoText">
            <b>Увійдіть за допомогою YouTube</b> та отримайте більше персоналізованих пропозицій!
          </div>

          <button
            className="loginYoutubeBtn"
            type="button"
            onClick={() => console.log("[LOGIN] YouTube button clicked (demo).")}
          >
            <img className="loginYoutubeIcon" src={youtubeIcon} alt="YouTube" />
            Увійти через YouTube
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="loginLabel" htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            className="loginInput"
            type="email"
            placeholder="Ваша електронна пошта."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="loginLabel" htmlFor="loginPassword">Пароль</label>
          <input
            id="loginPassword"
            className="loginInput"
            type="password"
            placeholder="Ваш пароль."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="loginForgot"
            type="button"
            onClick={() => console.log("[LOGIN] Forgot password clicked (demo).")}
          >
            Забули пароль?
          </button>

          <div className="loginSocial">
            <div className="loginSocialText">Або увійдіть через</div>
            <div className="loginSocialBtns">
              <button
                type="button"
                className="loginSocialBtn"
                onClick={() => console.log("[LOGIN] Google clicked (demo).")}
                aria-label="Google"
              >
                G
              </button>
              <button
                type="button"
                className="loginSocialBtn"
                onClick={() => console.log("[LOGIN] Facebook clicked (demo).")}
                aria-label="Facebook"
              >
                f
              </button>
            </div>
          </div>

          <button type="submit" className="loginPrimaryBtn">
            Увійти
          </button>
        </form>

        <button type="button" className="loginRegisterBtn" onClick={handleOpenRegister}>
          Зареєструватись
        </button>
      </div>
    </div>
  );
}

export default LogInPanel;
