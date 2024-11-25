import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./navBar.scss";
import busIcon from "../../assets/busIcon.png";
import { IconPessoa } from '../IconPessoa';


export function NavBar({ setToken }) {
  const navigate = useNavigate();
  const [itemNav, setItemNav] = useState(Number(window.sessionStorage.getItem("itemNav")) || 0)
  const nomeUsuario = window.sessionStorage.getItem("nome");

  const logoutUser = () => {
    window.sessionStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <nav>
      <figure className='figure'>
        <img src={busIcon} className='mx-auto d-block' alt="busIcon" />
      </figure>

      <IconPessoa />
      <p className='mb-5 pb-3'>{nomeUsuario}</p>
      <ul className='p-0'>
        <li className={itemNav === 0 ? "styleLi" : "opacity-50" } >
          <Link onClick={() => { setItemNav(0) }} className='link-router-dom' to="/">Home</Link>
        </li>
        <li className={itemNav === 1 ? "styleLi " : "opacity-50" } >
          <Link onClick={() => { setItemNav(1) }} className='link-router-dom' to="/about">About</Link>
        </li>
        <li className={itemNav === 2 ? "styleLi" : "opacity-50" } >
          <Link onClick={() => { setItemNav(2) }} className='link-router-dom' to="/passagens">Passagens</Link>
        </li>
        <li className={itemNav === 3 ? "styleLi" : "opacity-50" } >
          <Link onClick={() => { setItemNav(3) }} className='link-router-dom' to="/minhasViagens">Minhas Viagens</Link>
        </li>
        <li onClick={logoutUser} className='opacity-50'>
          Sair
        </li>
      </ul>
    </nav>
  );
}
