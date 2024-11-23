import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para redirecionar
import axios from 'axios';
import "./passagemInfo.scss";
import map from "../../assets/map.png";
import { Load } from '../Load';

export function PassagemInfo({ setDetalhesViagem }) {
    const [viagens, setViagens] = useState([]);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate(); // Inicializa o hook de navegação

    useEffect(() => {
        // Faz a requisição para o backend
        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
            .then((response) => {
                console.log(response.data);
                setViagens(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar informações das viagens:", error);
                setErro("Não foi possível carregar as informações das viagens.");
            });
    }, []); // Executa apenas ao montar o componente

    if (erro) {
        return <p>{erro}</p>; // Exibe mensagem de erro, se houver
    }

    if (viagens.length === 0) {
        return <div>
            <Load />
            <p>Carregando informações das viagens...</p>
        </div>; // Exibe enquanto os dados estão carregando
    }

    const handleVerMais = (viagemId) => {
        navigate(`/escolherAssento?id=${viagemId}`); // Redireciona para a rota com o ID da viagem na query string
    };

    return (
        <>
            {viagens.map((viagem, index) => (
                <section key={index} className='container-passagem-info p-3'>
                    <div className="d-flex align-items-start">
                        <img className='map-passagem-info' src={map} alt="Mapa" />
                        <div>
                            <p>Origem: {viagem.origem}</p>
                            <p>Destino: {viagem.destino}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <p>A partir de <strong>R${viagem.preco}</strong></p>
                        <button
                            onClick={() => handleVerMais(viagem.id_viagem)} // Chama a função ao clicar no botão
                            className='button-horarios-passagem-info'
                        >
                            <span>Ver Mais</span>
                        </button>
                    </div>
                </section>
            ))}
        </>
    );
}
