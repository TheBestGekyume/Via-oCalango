import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./navBar.scss";
import busIcon from "../../assets/busIcon.png";
import { IconPessoa } from '../IconPessoa';


export function NavBar({ setToken }) {
  const navigate = useNavigate();
  const itemNav = Number(window.sessionStorage.getItem("itemNav"));
  const nomeUsuario = window.sessionStorage.getItem("nome");

  const logoutUser = () => {
    window.sessionStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="barra-lateral">
      <figure className='figure'>
        <img src={busIcon} className='imgIcon' />
      </figure>

      <IconPessoa />
      <p>{nomeUsuario}</p>
      <ul>
        <li className={itemNav === 0 ? "styleLi" : null}>
          <Link className='link-router-dom' to="/">Home</Link>
        </li>
        <li onClick={logoutUser} style={{ cursor: 'pointer' }}>
          Sair
        </li>
      </ul>
    </nav>
  );
}
