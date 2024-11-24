import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./passagemInfo.scss";
import map from "../../assets/map.png";
import { Load } from '../Load';
import { ViagemMensagem } from '../ViagemMensagem/ViagemMensagem';

export function PassagemInfo({ local }) {
    const [viagens, setViagens] = useState([]);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
            .then((response) => {
                setViagens(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar informações das viagens:", error);
                setErro("Não foi possível carregar as informações das viagens.");
            });
    }, []);

    if (erro) {
        return <p>{erro}</p>;
    }

    if (viagens.length === 0) {
        return (
            <div>
                <Load />
                <p>Carregando informações das viagens...</p>
            </div>
        );
    }

    // Função para extrair a cidade antes do "-"
    const getCityName = (city) => {
        return city.split(" -")[0].trim(); // Pega tudo antes do " -"
    };

    const normalizeString = (str) => {
        return str
            .normalize('NFD') // Decompor os caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
            .toLowerCase(); // Converte para minúsculo
    };

    const viagensFiltradas = local && local.origem && local.destino
        ? viagens.filter(
            (viagem) =>
                normalizeString(getCityName(viagem.origem)) === normalizeString(getCityName(local.origem)) &&
                normalizeString(getCityName(viagem.destino)) === normalizeString(getCityName(local.destino))
        )
        : viagens;

    const handleVerMais = (viagemId) => {
        navigate(`/escolherAssento?id=${viagemId}`);
    };

    return (
        <>
            <ViagemMensagem local={local} viagensFiltradas={viagensFiltradas} />
        
            {viagensFiltradas.map((viagem, index) => (
                <section key={index} className='container-passagem-info p-3' style={ viagensFiltradas.length === 1 ? { width:'100%' } : {}}>
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
                            onClick={() => handleVerMais(viagem.id_viagem)}
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
