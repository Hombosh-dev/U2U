import React from 'react';
import './RecommendedVideos.css';

const RecommendedVideos = ({ channels }) => {
  const sourceChannel = channels?.find(ch => ch.id === "1") || channels?.[0];
  
  const videos = sourceChannel?.recommendedVideos || [];

  if (videos.length === 0) return null;

  const handleVideoClick = (url) => {
    if (url) {
      console.log('[RecommendedVideos] Opening video:', url);
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