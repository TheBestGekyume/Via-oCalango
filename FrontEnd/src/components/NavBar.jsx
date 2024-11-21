import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function NavBar({ setToken }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    window.sessionStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="barra-lateral">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li onClick={logoutUser} style={{ cursor: 'pointer' }}>
          Sair
        </li>
      </ul>
    </nav>
  );
}
