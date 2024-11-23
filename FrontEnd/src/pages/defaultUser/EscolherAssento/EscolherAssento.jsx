import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import onibus from "../../../assets/onibus.png";
import disponivel from "../../../assets/assentoDisponivel.png";
import indisponivel from "../../../assets/assentoIndisponivel.png";
import selecionado from "../../../assets/assentoSelecionado.png";
import './escolherAssento.scss';

export function EscolherAssento() {
    const [viagem, setViagem] = useState(null);
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const viagemId = searchParams.get('id');
    const usuarioId = window.sessionStorage.getItem("id_usuario");

    useEffect(() => {
        const token = window.sessionStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }

        if (!viagemId) {
            console.error("ID da viagem não encontrado.");
            return;
        }

        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
            .then((response) => {
                const viagens = response.data;
                const viagemSelecionada = viagens.find(v => v.id_viagem === viagemId);
                if (viagemSelecionada) {
                    setViagem({
                        id: viagemSelecionada.id_viagem,
                        assentos: viagemSelecionada.assentos
                    });
                } else {
                    console.error("Viagem não encontrada.");
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar viagens:', error);
            });
    }, [viagemId, navigate]);

    const toggleSelecionarAssento = (nro_assento) => {
        if (assentosSelecionados.includes(nro_assento)) {
            setAssentosSelecionados((prev) => prev.filter((assento) => assento !== nro_assento));
        } else {
            setAssentosSelecionados((prev) => [...prev, nro_assento]);
        }
    };

    const handleCompra = async () => {
        const assentosIndisponiveis = assentosSelecionados.map((nro_assento) => ({ nro_assento }));
        const objetoCompra = {
            id_viagem: viagem.id,
            usuario_id: usuarioId,
            assentos_indisponiveis: assentosIndisponiveis
        };
        console.log("JSON para requisição:", JSON.stringify(objetoCompra));

        try {
            const response = await axios.put("http://localhost/viacaocalango/BackEnd/crudUsuario/comprarAssento.php",
                objetoCompra
            )

            console.log(response.data);

        } catch (error) {
            console.log(error.response);
        }

    };

    const getAssentoImage = (assento) => {
        if (assentosSelecionados.includes(assento.nro_assento)) {
            return selecionado;
        }
        return assento.disponivel ? disponivel : indisponivel;
    };

    if (!viagem) {
        return <p>Carregando...</p>;
    }

    const fileiraA = viagem.assentos.filter(assento => assento.nro_assento.startsWith('A'));
    const fileiraB = viagem.assentos.filter(assento => assento.nro_assento.startsWith('B'));

    return (
        <div className="container-selecao-assentos" style={{ height: '100vh' }}>
            <div style={{ width: '100%', display: "flex", justifyContent: 'space-between', marginTop: "2rem" }}>
                <svg style={{ cursor: 'pointer', marginLeft: '2rem' }} onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path fill="#FFB803" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>

                <h3 style={{ marginRight: "2rem" }} className='text-white'>Selecionar Assentos - Viagem ID: {viagem.id}</h3>
            </div>
            <div className="onibus-container d-flex justify-content-center flex-wrap ">
                <img src={onibus} alt="Ônibus" className="onibus-imagem position-absolute" />
                <div className='assentos-container d-flex flex-column '>
                    <div>
                        {fileiraA.map((assento, index) => (
                            <img
                                key={index}
                                src={getAssentoImage(assento)}
                                alt={`Assento ${assento.nro_assento}`}
                                className="assento-imagem fileira-A"
                                onClick={() => assento.disponivel && toggleSelecionarAssento(assento.nro_assento)}
                            />
                        ))}
                    </div>
                    <div>
                        {fileiraB.map((assento, index) => (
                            <img
                                key={index}
                                src={getAssentoImage(assento)}
                                alt={`Assento ${assento.nro_assento}`}
                                className="assento-imagem fileira-B"
                                onClick={() => assento.disponivel && toggleSelecionarAssento(assento.nro_assento)}
                            />
                        ))}
                    </div>
                </div>
                <section style={{ width: "100%", marginTop: '10rem ', display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
                    <div className='container-tipo-assento'>
                        <figure className='container-img-tipo'>
                            <img className="assento-imagem fileira-B" src={disponivel} style={{ width: "60px" }} />
                            <p>Disponível</p>
                        </figure >

                        <figure className='container-img-tipo'>
                            <img className="assento-imagem fileira-B" src={indisponivel} style={{ width: "60px", borderRadius: '8px' }} />
                            <p>Indisponível</p>
                        </figure>

                        <figure className='container-img-tipo'>
                            <img className="assento-imagem fileira-B" src={selecionado} style={{ width: "60px", borderRadius: '8px' }} />
                            <p>Selecionado</p>
                        </figure>
                    </div>
                    <button className='buscar-viagem' style={{ width: '15%' }} onClick={handleCompra}>Comprar</button>
                </section>
            </div>
        </div>
    );
}
