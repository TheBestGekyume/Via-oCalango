import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { NavBar } from './components/NavBar';
import './App.css';

export function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem('token'));

  return (
    <Router>
      <main style={{ display: 'flex' }} className="container-main">
        {token && <NavBar setToken={setToken} />}

        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}
