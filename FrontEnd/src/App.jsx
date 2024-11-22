import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.jsx';
import { Login } from './pages/Login/Login.jsx';
import { NavBar } from './components/NavBar/NavBar.jsx';
import './app.scss';

export function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem('token'));

  return (
    <Router>
      <main style={{ display: 'flex' }} className="container-main vw-100 vh-100">

        {token && <NavBar setToken={setToken} />}

        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}
