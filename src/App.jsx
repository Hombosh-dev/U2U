import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Assistant from './components/Assistant/Assistant';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Channels from './pages/Channels/Channels';

import Account from './pages/Account/Account';

import LogInPanel from './components/LogInPanel/LogInPanel';
import Registration from './components/Registration/Registration';
import AIAssistant from './components/AIAssistantWindow/AIAssistant';

import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const [activeModal, setActiveModal] = useState(null); // null | 'login' | 'register'
  const [aiOpen, setAiOpen] = useState(false);

  const handleLogout = () => {
    console.log('[AUTH] Logout');
    setIsAuth(false);
  };

  const handleLogin = (payload) => {
    console.log('[AUTH] Login (demo):', payload);
    setIsAuth(true);
    setActiveModal(null);
  };

  const handleRegister = (payload) => {
    console.log('[AUTH] Register (demo):', payload);
    setIsAuth(true);
    setActiveModal(null);
  };

  return (
    <div className="App">
      <Header
        isAuth={isAuth}
        onLogout={handleLogout}
        onOpenLogin={() => setActiveModal('login')}
        onOpenRegister={() => setActiveModal('register')}
        onOpenAI={() => setAiOpen(true)}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/about" element={<About />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/account" element={<Account onLogout={handleLogout} />} />
        </Routes>
      </main>

      {/* LOGIN MODAL */}
      {activeModal === 'login' && (
        <LogInPanel
          onLogin={handleLogin}
          onClose={() => setActiveModal(null)}
          onOpenRegister={() => {
            console.log('[UI] Open Registration from Login');
            setActiveModal('register');
          }}
        />
      )}

      {/* REGISTER MODAL */}
      {activeModal === 'register' && (
        <Registration
          open={true}
          onClose={() => setActiveModal(null)}
          onRegistered={handleRegister}
        />
      )}

      {/* AI MODAL */}
      <AIAssistant
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onSend={(msg) => console.log('[AI] Send:', msg)}
        onTemplate={(t) => console.log('[AI] Template:', t)}
      />

      <Assistant isOpen={aiOpen} onToggle={() => setAiOpen(!aiOpen)} />
      <Footer />
    </div>
  );
}

export default App;
