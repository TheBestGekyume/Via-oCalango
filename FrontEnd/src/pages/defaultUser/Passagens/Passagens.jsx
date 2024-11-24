import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DestinoUser } from '../../../components/Destino-usuario/DestinoUser.jsx';
import search from "../../../assets/search.png";
import "./passagens.scss";
import { Load } from '../../../components/Load.jsx';
import { PassagemInfo } from '../../../components/Passagem-Info/PassagemInfo.jsx';
import { DetalhesViagem } from '../../../components/DetalhesViagem/DetalhesViagem.jsx';

export function Passagens() {
    useEffect(() => {
        if (Number(window.sessionStorage.getItem("itemNav")) !== 2) {
            window.location.reload();
        }
        if (token) {
            window.sessionStorage.setItem("itemNav", 2);
        }
    }, [])
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem("token");
    const [local, setLocal] = useState(null);
    const [detalhesViagem, setDetalhesViagem] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
    console.log(local)

    if (token) {
        return (
            <div className='w-100 h-100 d-flex flex-column align-items-center mt-3 mb-5'>
                <div className='w-100 px-4'>
                    <DestinoUser setLocal={setLocal} />
                </div>
                {!detalhesViagem && (
                    <section className='d-flex flex-wrap'>
                        <PassagemInfo /* setDetalhesViagem={setDetalhesViagem} */ local={local} />
                    </section>
                )}
            </div>
        );
    }
}
