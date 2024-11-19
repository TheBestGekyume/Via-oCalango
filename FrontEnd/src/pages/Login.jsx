import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login({ setToken }) {
    const [userCredentials, setUserCredentials] = useState({ login: '', senha: '', statusErros: null });
    const navigate = useNavigate();

    const logarUsuario = () => {
        axios.post('http://localhost/ViacaoCalango/BackEnd/crudUsuario/autenticarUsuario.php', {
            email: userCredentials.login,
            senha: userCredentials.senha
        })
        .then((response) => {
            const { status, tipo, nome } = response.data;
            window.sessionStorage.setItem('token', status);
            window.sessionStorage.setItem('typeUser', tipo);
            window.sessionStorage.setItem('nome', nome);
            setToken(status);
            navigate("/home");
        })
        .catch((error) => {
            setUserCredentials((prev) => ({ ...prev, statusErros: error.response?.data?.mensagem || "Erro de autenticação" }));
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <section>
                <input 
                    type='text' 
                    placeholder="Usuário" 
                    onChange={(e) => setUserCredentials(prev => ({ ...prev, login: e.target.value }))} 
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    onChange={(e) => setUserCredentials(prev => ({ ...prev, senha: e.target.value }))} 
                />
                <button onClick={logarUsuario}>Entrar</button>
            </section>
            {userCredentials.statusErros && <p>{userCredentials.statusErros}</p>}
        </div>
    );
}
