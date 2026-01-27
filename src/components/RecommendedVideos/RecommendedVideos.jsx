import React from 'react';
import './RecommendedVideos.css';

const RecommendedVideos = ({ channels }) => {
  // Шукаємо канал з id="1" (Melior Max) у переданому масиві
  const sourceChannel = channels?.find(ch => ch.id === "1");
  
  // Якщо канал є, беремо його рекомендовані відео, інакше - пустий масив
  const videos = sourceChannel?.recommendedVideos || [];

  // Якщо відео немає, нічого не рендеримо
  if (videos.length === 0) return null;

  const handleVideoClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="recommended-section">
      <h2 className="recommended-header">Рекомендовані відео</h2>
      
      <div className="videos-grid">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="video-card"
            onClick={() => handleVideoClick(video.url)}
          >
            <div className="thumbnail-wrapper">
              <img 
                src={video.image} 
                alt={video.title} 
                className="video-thumbnail" 
              />
              <div className="play-overlay">
                <div className="play-icon"></div>
              </div>
            </div>
            
            <div className="video-details">
              <div className="video-title">
                {video.title}
              </div>
              {/* Відображаємо subtitle, якщо він є в JSON, інакше просто title повторно або нічого */}
              {video.subtitle && (
                <div className="video-subtitle">
                  {video.subtitle}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedVideos;