import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Assistant from './components/Assistant/Assistant';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    <div className="App">
      <Header isAuth={isAuth} onLogout={handleLogout} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      <Assistant />
      <Footer />
    </div>
  );
};

export default App;
