import React, { useState } from 'react';
import './Assistant.css';

import IdleIcon from '../../assets/icons/assistant_idle.svg';
import OpenIcon from '../../assets/icons/assistant_open.svg';
import AIAssistant from '../AIAssistantWindow/AIAssistant';


const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = (message) => {
    console.log("Message sent:", message);
  };

  const handleTemplate = (template) => {
    console.log("Template selected:", template);
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
      <AIAssistant
        open={isOpen}
        onClose={handleClose}
        onSend={handleSend}
        onTemplate={handleTemplate}
      />
    </div>
  );
};

export default Assistant;
