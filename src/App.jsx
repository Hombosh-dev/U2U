import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      <Header isAuth={isAuth} />
      <main style={{ minHeight: '80vh', padding: '40px 24px' }}>
        <h1>Головна сторінка</h1>
        <p>Поточний статус: <strong>{isAuth ? 'Користувач авторизований' : 'Гість'}</strong></p>
      </main>

      <Footer />

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