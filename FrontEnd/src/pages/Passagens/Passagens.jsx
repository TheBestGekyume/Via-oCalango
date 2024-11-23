import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DestinoUser } from '../../components/Destino-usuario/DestinoUser.jsx';
import search from "../../assets/search.png";
import "./passagens.scss";
import { Load } from '../../components/Load.jsx';
import { PassagemInfo } from '../../components/Passagem-Info/PassagemInfo.jsx';
import { DetalhesViagem } from '../../components/DetalhesViagem/DetalhesViagem.jsx';

export function Passagens() {
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem("token");
    const [local, setLocal] = useState(null);
    const [detalhesViagem, setDetalhesViagem] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (token) {
        window.sessionStorage.setItem("itemNav", 2);
    }

    const arrayPassTeste = [1, 2, 3, 4, 5, 6, 7]

    if (token) {
        return (
            <div style={{ width: '100%', display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '10rem', height: '100vh' }}>
                <div style={{ width: '90%' }}>
                    <DestinoUser setLocal={setLocal} />
                </div>
                {local && <div style={{ width: '90%', display: "flex", justifyContent: "space-between", alignItems: 'center', marginTop: '5rem' }}>
                    <h3 className='bus-txt-local'>Ônibus para {local}</h3>
                    <div className='input-search'>
                        <input placeholder='Filtrar por nome' />
                        <img src={search} style={{ height: "auto", width: '20px' }} />
                    </div>
                </div>}
                <Load />
                {!detalhesViagem && <section style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {arrayPassTeste.map((item, index) => (
                        <PassagemInfo key={index} setDetalhesViagem={setDetalhesViagem} />
                    ))}
                </section>}

                {detalhesViagem && <DetalhesViagem setDetalhesViagem={setDetalhesViagem}/>}
            </div>
        )
    }
}
