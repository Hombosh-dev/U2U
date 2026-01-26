import React from 'react';
import { Link } from 'react-router-dom';
import './Compilations.css';
import db from '../../../db.json';
import CategoryPill from '../../components/CategoryPill/CategoryPill';

const ArrowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66699 10.9998L8.00033 14.3332L11.3337 10.9998M4.66699 4.99984L8.00033 1.6665L11.3337 4.99984" stroke="#207CD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Compilations = () => {
  const { categories } = db;

  return (
    <div className="compilations-container">
      <div className="breadcrumbs">
        <Link to="/" className="breadcrumb-link">Головна</Link>
        <span> / </span>
        <span className="breadcrumb-link">Добірки</span>
      </div>

      <div className="compilations-main-content">
        <h1 className="compilations-title">Тематичні добірки</h1>

        <div className="search-filter-section">
          <div className="search-input-placeholder">
            <input type="text" placeholder="Розширений пошук..." readOnly />
          </div>
          <div className="filter-buttons-placeholder">
            <button className="filter-btn">
              Алфавіт <ArrowsIcon />
            </button>
            <button className="filter-btn">
              Кількість каналів <ArrowsIcon />
            </button>
          </div>
        </div>

        <div className="compilations-list">
          {categories.map(category => (
            <CategoryPill
              key={category.id}
              icon={category.icon}
              name={category.name}
              videoCount={category.count}
              expanded={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compilations;
