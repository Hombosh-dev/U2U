import React, { useState } from 'react';
import './Assistant.css';

import IdleIcon from '../../assets/icons/assistant_idle.svg';
import OpenIcon from '../../assets/icons/assistant_open.svg';


const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="assistant-container">
      {!isOpen && (
        <div className="assistant-bubble">
          <p className="assistant-bubble-text">Маєш проблеми з пошуком?</p>
        </div>
      )}
      <div className="assistant-button" onClick={toggleOpen}>
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
