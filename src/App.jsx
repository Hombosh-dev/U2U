import React, { useMemo, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogInPanel from './components/LogInPanel/LogInPanel';
import Registration from './components/Registration/Registration';

import FiltersPanel, { DEFAULT_FILTERS } from './components/FiltersWindow/FiltersPanel';
import AIAssistant from './components/AIAssistantWindow/AIAssistant';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null | 'login' | 'register'

  // ✅ filters
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [resultsCount, setResultsCount] = useState(10);

  // ✅ AI assistant
  const [aiOpen, setAiOpen] = useState(false);

  const activeCount = useMemo(() => {
    let c = 0;
    c += (filters.topics?.length || 0);
    if (filters.language?.onlyUA) c += 1;
    if (filters.language?.dubbedUA) c += 1;
    if (filters.duration) c += 1;
    return c;
  }, [filters]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log('APPLY FILTERS:', newFilters);
    // setResultsCount(...)
  };

  return (
    <div className="App">
      <Header isAuth={isAuth} />

      <main style={{ minHeight: '80vh', padding: '40px 24px' }}>
        <h1>Головна сторінка</h1>
        <p>Поточний статус: <strong>{isAuth ? 'Користувач авторизований' : 'Гість'}</strong></p>

        {/* ✅ кнопки Фільтри + AI помічник */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setFiltersOpen(true)}
            style={{
              padding: '10px 20px',
              background: '#2f7ee6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '800',
              position: 'relative'
            }}
          >
            Фільтри
            {activeCount > 0 && (
              <span
                style={{
                  marginLeft: '10px',
                  display: 'inline-block',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 6px',
                  borderRadius: '999px',
                  background: '#0b3a7a',
                  fontSize: '12px',
                  lineHeight: '18px',
                  textAlign: 'center',
                  fontWeight: '900'
                }}
              >
                {activeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAiOpen(true)}
            style={{
              padding: '10px 20px',
              background: '#2f7ee6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '800'
            }}
          >
            AI помічник
          </button>
        </div>

        {!isAuth && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => setActiveModal('login')}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Вхід
            </button>

            <button
              onClick={() => setActiveModal('register')}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Реєстрація
            </button>
          </div>
        )}

        <pre style={{ marginTop: 20, background: '#f6f8ff', padding: 12, borderRadius: 10 }}>
          {JSON.stringify(filters, null, 2)}
        </pre>
      </main>

      <Footer />

      {/* LOGIN MODAL */}
      {activeModal === 'login' && (
        <LogInPanel
          onLogin={() => { setIsAuth(true); setActiveModal(null); }}
          onClose={() => setActiveModal(null)}
          onOpenRegister={() => setActiveModal('register')}
        />
      )}

      {/* REGISTER MODAL */}
      {activeModal === 'register' && (
        <Registration
          open={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* FILTERS PANEL */}
      <FiltersPanel
        open={filtersOpen}
        value={filters}
        onClose={() => setFiltersOpen(false)}
        onApply={applyFilters}
        onReset={(defaults) => setFilters(defaults)}
        resultsCount={resultsCount}
      />

      {/* AI ASSISTANT WINDOW */}
      <AIAssistant
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onSend={(msg) => console.log('AI SEND:', msg)}
        onTemplate={(t) => console.log('AI TEMPLATE:', t)}
      />

      {/* dev controls */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
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
}

export default App;
