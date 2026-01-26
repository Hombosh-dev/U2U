import React from 'react';
import './CategoryPill.css';

const CategoryPill = ({ icon, name, expanded = false, videoCount }) => {
  const componentClasses = `category-pill ${expanded ? 'expanded' : ''}`;

  return (
    <div className={componentClasses}>
      {expanded ? (
        <>
          <div className="category-pill-content-expanded">
            <span className="cat-icon">{icon}</span>
            <span className="cat-name">{name}</span>
          </div>
          {videoCount && <span className="cat-video-count">{videoCount}</span>}
        </>
      ) : (
        <>
          <span className="cat-icon">{icon}</span>
          <span className="cat-name">{name}</span>
        </>
      )}
    </div>
  );
};

export default CategoryPill;
