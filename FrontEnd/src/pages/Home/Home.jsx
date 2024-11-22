import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import "./home.scss";

export function Home() {
  window.sessionStorage.setItem('itemNav', 0);
  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (token) {
    return (
      <div id='home' className='text-white text-center pt-5'>
        <button className='btn btn-lg text-white mb-5' type='button'>
          <h3>COMPRE ANTECIPADO E GANHE 10% DE DESCONTO</h3>
        </button>
        <section className='mx-5 rounded-4'>
          <Card />
        </section>
      </div>
    );
  }
}
