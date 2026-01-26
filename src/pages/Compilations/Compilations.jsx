import React from 'react';
import { Link } from 'react-router-dom';
import './Compilations.css';
import db from '../../../db.json';
import CategoryPill from '../../components/CategoryPill/CategoryPill';
import ArrowsIcon from '../../assets/icons/arrows.svg';

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
              Алфавіт <img src={ArrowsIcon} alt="Sort" />
            </button>
            <button className="filter-btn">
              Кількість каналів <img src={ArrowsIcon} alt="Sort" />
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
