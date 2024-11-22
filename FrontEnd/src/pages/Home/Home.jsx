import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  window.sessionStorage.setItem('itemNav', 0);
  const token = window.sessionStorage.getItem("token");
  const nomeUsuario = window.sessionStorage.getItem("nome");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (token) {
    return (
      <div>
        <div>Bem-vindo, {nomeUsuario}</div>
      </div>
    );
  }
}
