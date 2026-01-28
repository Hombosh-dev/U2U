import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Compilations.css';
import db from '../../../db.json';
import CategoryPill from '../../components/CategoryPill/CategoryPill';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import ArrowsIcon from '../../assets/icons/arrows.svg';

const Compilations = () => {
  const { categories, channels } = db;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categorySortBy, setCategorySortBy] = useState('name');
  const [categorySortOrder, setCategorySortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = selectedCategory
    ? channels.filter(ch => ch.category.includes(selectedCategory.name))
    : [];

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catName = params.get('category');
    if (catName) {
      const found = categories.find(c => c.name === catName);
      if (found) {
        setSelectedCategory(found);
        setSortBy('name');
        setSortOrder('asc');
      }
    }
  }, [location.search, categories]);
  // helper: parse numbers from strings like "45.1k", "17.4k", or plain numbers
  const parseCount = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    let v = String(value).trim();
    v = v.replace(/\s+/g, '');
    v = v.replace(',', '.');
    if (/тис/i.test(v)) {
      const n = parseFloat(v.replace(/[^0-9.]/g, '')) || 0;
      return n * 1000;
    }
    const n = parseFloat(v.replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const sortedChannels = useMemo(() => {
    const sorted = [...filteredChannels];

    if (sortBy === 'name') {
      sorted.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, 'uk');
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    } else if (sortBy === 'subscribers') {
      sorted.sort((a, b) => {
        const aCount = parseCount(a.subscribers);
        const bCount = parseCount(b.subscribers);
        return sortOrder === 'asc' ? aCount - bCount : bCount - aCount;
      });
    } else if (sortBy === 'videos') {
      sorted.sort((a, b) => {
        const aCount = parseCount(a.videos);
        const bCount = parseCount(b.videos);
        return sortOrder === 'asc' ? aCount - bCount : bCount - aCount;
      });
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => {
        const aR = parseFloat(a.rating) || 0;
        const bR = parseFloat(b.rating) || 0;
        return sortOrder === 'asc' ? aR - bR : bR - aR;
      });
    }

    return sorted;
  }, [filteredChannels, sortBy, sortOrder]);

  const sortedCategories = useMemo(() => {
    const sorted = [...categories];
    
    if (categorySortBy === 'name') {
      sorted.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, 'uk');
        return categorySortOrder === 'asc' ? comparison : -comparison;
      });
    } else if (categorySortBy === 'count') {
      sorted.sort((a, b) => {
        return categorySortOrder === 'asc' ? a.count - b.count : b.count - a.count;
      });
    }
    
    return sorted;
  }, [categories, categorySortBy, categorySortOrder]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSortBy('name');
    setSortOrder('asc');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleSortByName = () => {
    if (sortBy === 'name') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy('name');
      setSortOrder('asc');
    }
  };

  const handleSortBy = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleCategorySortByName = () => {
    if (categorySortBy === 'name') {
      setCategorySortOrder(categorySortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setCategorySortBy('name');
      setCategorySortOrder('asc');
    }
  };

  const handleCategorySortByCount = () => {
    if (categorySortBy === 'count') {
      setCategorySortOrder(categorySortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setCategorySortBy('count');
      setCategorySortOrder('asc');
    }
  };

  // Show filtered channels view
  if (selectedCategory) {
    return (
      <div className="compilations-container">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-link">Головна</Link>
          <span> / </span>
          <button 
            className="breadcrumb-link" 
            onClick={handleBackToCategories}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Добірки
          </button>
          <span> / </span>
          <span className="breadcrumb-link">{selectedCategory.name}</span>
        </div>

        <div className="compilations-main-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h1 className="compilations-title" style={{ margin: 0 }}>
              {selectedCategory.icon} {selectedCategory.name}
            </h1>
          </div>

          <div className="search-filter-section">
            <div className="search-input-placeholder">
              <input
                type="text"
                placeholder="Розширений пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons-placeholder">
              <button
                className={`filter-btn ${sortBy === 'subscribers' ? 'active' : ''}`}
                onClick={() => handleSortBy('subscribers')}
              >
                Підписники
              </button>
              <button
                className={`filter-btn ${sortBy === 'videos' ? 'active' : ''}`}
                onClick={() => handleSortBy('videos')}
              >
                Відео
              </button>
              <button
                className={`filter-btn ${sortBy === 'rating' ? 'active' : ''}`}
                onClick={() => handleSortBy('rating')}
              >
                Оцінка
              </button>
            </div>
          </div>

          <div className="channels-grid">
            {sortedChannels.length > 0 ? (
              sortedChannels.map(ch => (
                <ChannelCard key={ch.id} channel={ch} />
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>
                Канали в цій категорії не знайдені
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show categories list view
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
            <input
              type="text"
              placeholder="Розширений пошук..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons-placeholder">
            <button 
              className={`filter-btn ${categorySortBy === 'name' ? 'active' : ''}`}
              onClick={handleCategorySortByName}
            >
              Алфавіт
            </button>
            <button 
              className={`filter-btn ${categorySortBy === 'count' ? 'active' : ''}`}
              onClick={handleCategorySortByCount}
            >
              Кількість каналів
            </button>
          </div>
        </div>

        <div className="compilations-list">
          {sortedCategories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: 'pointer' }}
            >
              <CategoryPill
                icon={category.icon}
                name={category.name}
                videoCount={category.count}
                expanded={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compilations;
