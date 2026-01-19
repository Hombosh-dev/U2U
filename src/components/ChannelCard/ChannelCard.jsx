import React from 'react';
import './ChannelCard.css';

const ChannelCard = ({ channel }) => {
  if (!channel) return null;

  return (
    <div className="channel-card">
      <div className="card-avatar-wrapper">
        <img 
          src={channel.avatar} 
          alt={channel.name} 
          className="card-avatar" 
        />
      </div>

      <div className="card-header">
        <div className="header-info">
          <h2 className="channel-name">{channel.name}</h2>
          <span className="channel-category">{channel.category}</span>
        </div>
        <div className="youtube-icon">
          <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="22" rx="4" fill="#E42E21"/>
            <path d="M12 16V6L22 11L12 16Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <span className="stat-label">Підписники</span>
          <span className="stat-value">{channel.subscribers}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Відео</span>
          <span className="stat-value">{channel.videos}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Оцінка</span>
          <div className="rating-wrapper">
            <span className="star-icon">★</span>
            <span className="stat-value">{channel.rating}</span>
          </div>
        </div>
      </div>

      {/* Опис */}
      <div className="card-description">
        <p className="description-text">
          {channel.description}
        </p>
      </div>

      <a href={channel.youtubeLink || "#"} className="card-link">
        Переглянути інформацію
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 5L11 9L7 13" stroke="#4FA1ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export default ChannelCard;