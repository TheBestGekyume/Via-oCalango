import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../../components/Card/Card';
import "./home.scss";

export function Home() {
  const token = window.sessionStorage.getItem("token");

  const [itemNav, setItemNav] = useState(Number(window.sessionStorage.getItem("itemNav")) || 0)


  const navigate = useNavigate();
  useEffect(() => {

    if (!token) {
      navigate('/login');
    } else {
      window.sessionStorage.setItem("itemNav", 0);
    }
  }, [token, navigate]);


  if (token) {
    return (
      <div id='home' className='text-white text-center pt-5'>
        <Link to="/passagens" onClick={window.sessionStorage.setItem("itemNav", 2)}>
          <button className='btn btn-lg text-white mb-5' type='button'>

            <Link onClick={() => { setItemNav(2) }} className='text-decoration-none text-white' to="/passagens">
              <h3>COMPRE ANTECIPADO E GANHE 10% DE DESCONTO</h3>
            </Link>

          </button>
        </Link>
        <section className='mx-5 rounded-4'>
          <Card />
        </section>
      </div>
    );
  }
}
