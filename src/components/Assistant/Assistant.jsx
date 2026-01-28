import React from 'react';
import './Assistant.css';

import IdleIcon from '../../assets/icons/assistant_idle.svg';
import OpenIcon from '../../assets/icons/assistant_open.svg';

const Assistant = ({ isOpen, onToggle }) => {
  return (
    <div className="assistant-container">
      {!isOpen && (
        <div className="assistant-bubble">
          <p className="assistant-bubble-text">Маєш проблеми з пошуком?</p>
        </div>
      )}
      <div className="assistant-button" onClick={onToggle}>
        <img
          src={isOpen ? OpenIcon : IdleIcon}
          alt="AI Assistant Icon"
          className="assistant-icon"
        />
      </div>
    </div>
  );
};

export default Assistant;
