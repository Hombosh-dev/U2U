import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPill.css';

const CategoryPill = ({ icon, name, expanded = false, to = '#', videoCount }) => {
  const componentClasses = `category-pill ${expanded ? 'expanded' : ''}`;

  return (
    <Link to={to} className={componentClasses}>
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
    </Link>
  );
};

export default CategoryPill;
