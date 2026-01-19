import React, { useState } from 'react';
import './QACard.css';

const QACard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-wrapper ${isOpen ? 'is-open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-title">{question}</span>
        <div className="accordion-icon">
          <svg 
            width="24" height="24" 
            viewBox="0 0 24 24" fill="none" 
            style={{ 
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: '0.3s' }}
          >
            <path d="M6 9L12 15L18 9" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-body">
          <p className="accordion-text">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QACard;