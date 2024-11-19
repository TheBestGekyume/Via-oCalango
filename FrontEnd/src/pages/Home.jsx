import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const token = window.sessionStorage.getItem("token");
  const nomeUsuario = window.sessionStorage.getItem("nome");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if(token){
    return (
        <div>Bem-vindo, {nomeUsuario}</div>
      );
  }
}
