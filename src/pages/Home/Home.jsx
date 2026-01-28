import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CategoryPill from '../../components/CategoryPill/CategoryPill';
import ChannelCard from '../../components/ChannelCard/ChannelCard';
import AddChannelForm from '../../components/AddChannelForm/AddChannelForm';
import './Home.css';

const Home = ({ isAuth, setIsAuth }) => {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [activeTab, setActiveTab] = useState('Рекомендації');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.categories);
        setChannels(data.channels);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedChannels = useMemo(() => {
    let sorted = [...channels];
    if (activeTab === 'Топ') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (activeTab === 'Нове') {
      sorted.sort(() => Math.random() - 0.5);
    }
    return sorted;
  }, [activeTab, channels]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-container">
      {isAuth && (
        <section className="saved-channels-section">
          <h3>Збережені канали</h3>
          <div className="saved-channels-content">
            <span>3</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>
      )}

      <section className="pills-section">
        <div className="section-header">
          <h2>Тематичні добірки</h2>
          <Link to="/compilations">переглянути всі</Link>
        </div>
        <div className="pills-container">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/compilations?category=${encodeURIComponent(cat.name)}`}
              style={{ textDecoration: 'none' }}
            >
              <CategoryPill icon={cat.icon} name={cat.name} />
            </Link>
          ))}
        </div>
      </section>

      <section className="channels-section">
        <div className="section-header">
            <h2>Ютуб-канали</h2>
            <Link to="/channels">переглянути всі</Link>
        </div>
        <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'Рекомендації' ? 'active' : ''}`}
              onClick={() => setActiveTab('Рекомендації')}
            >
              Рекомендації
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Нове' ? 'active' : ''}`}
              onClick={() => setActiveTab('Нове')}
            >
              Нове
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Топ' ? 'active' : ''}`}
              onClick={() => setActiveTab('Топ')}
            >
              Топ
            </button>
        </div>
        <div className="channel-cards-container">
            {sortedChannels.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
        </div>
      </section>

      <AddChannelForm isAuth={isAuth} />

      <div style={{
        position: 'fixed',
        bottom: '120px',
        left: '20px',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '12px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'sans-serif',
        fontSize: '14px'
      }}>
        <div style={{ fontWeight: 'bold', borderBottom: '1px solid #555', paddingBottom: '5px' }}>
          Dev Controls
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Auth Status:</span>
          <button
            onClick={() => setIsAuth(!isAuth)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: isAuth ? '#4caf50' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            {isAuth ? 'LOGGED IN' : 'GUEST'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;