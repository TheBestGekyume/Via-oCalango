import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import './App.css';
import { Login } from './pages/Login.jsx';

export function App() {
  return (
    <main style={{ display: 'flex' }} className="container-main">
      <Router>
        <nav className="barra-lateral">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </main>
  );
}

