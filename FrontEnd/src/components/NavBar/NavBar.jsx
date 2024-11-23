import React, { useEffect, useState } from 'react';
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
      <p>{nomeUsuario}</p>
      <ul>
        <li className={itemNav === 0 ? "styleLi" : null} style={itemNav !== 0 ? { opacity: "0.5" } : null}>
          <Link onClick={() => { setItemNav(0) }} className='link-router-dom' to="/">Home</Link>
        </li>
        <li className={itemNav === 1 ? "styleLi" : null} style={itemNav !== 1 ? { opacity: "0.5" } : null}>
          <Link onClick={() => { setItemNav(1) }} className='link-router-dom' to="/about">About</Link>
        </li>
        <li className={itemNav === 2 ? "styleLi" : null} style={itemNav !== 2 ? { opacity: "0.5" } : null}>
          <Link onClick={() => { setItemNav(2) }} className='link-router-dom' to="/passagens">Passagens</Link>
        </li>
        <li onClick={logoutUser} style={{ cursor: 'pointer', opacity: "0.5" }}>
          Sair
        </li>
      </ul>
    </nav>
  );
}
