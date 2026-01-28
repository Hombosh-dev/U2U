import React from 'react';
import './ChannelCard.css';
import youtubeIcon from '../../assets/icons/youtube.svg';
import { Link } from 'react-router-dom';

const ChannelCard = ({ channel, hasLink = true }) => {
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
          <img src={youtubeIcon} alt="Youtube" />
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

      {hasLink && (
        <>
          <div className="card-description">
            <p className="description-text">
              {channel.description}
            </p>
          </div>
          <Link to={`/channel/${channel.id}`} className="card-link">
            Переглянути інформацію
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 5L11 9L7 13" stroke="#4FA1ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </>
      )}
    </div>
  );
};

export default ChannelCard;