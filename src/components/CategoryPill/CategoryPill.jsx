import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPill.css';

const CategoryPill = ({ icon, name, expanded = false, to = '#' }) => {
  const componentClasses = `category-pill ${expanded ? 'expanded' : ''}`;

  return (
    <Link to={to} className={componentClasses}>
      <span className="cat-icon">{icon}</span>
      <span className="cat-name">{name}</span>
    </Link>
  );
};

export default CategoryPill;
