import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Importa o hook para acessar os parâmetros da query string
import axios from 'axios';
import onibus from "../../../assets/onibus.png";
import disponivel from "../../../assets/assentoDisponivel.png";
import indisponivel from "../../../assets/assentoIndisponivel.png";
import selecionado from "../../../assets/assentoSelecionado.png";
import './escolherAssento.scss';

export function EscolherAssento() {
    const [viagem, setViagem] = useState(null);
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [searchParams] = useSearchParams(); // Captura os parâmetros da URL
    const viagemId = searchParams.get('id'); // Obtém o ID da viagem

    useEffect(() => {
        if (!viagemId) {
            console.error("ID da viagem não encontrado.");
            return;
        }

        // Faz a requisição para listar as viagens
        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
            .then((response) => {
                const viagens = response.data;

                // Busca a viagem com o ID correspondente
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
    }, [viagemId]); // Recarrega quando o ID da viagem mudar

    const toggleSelecionarAssento = (nro_assento) => {
        if (assentosSelecionados.includes(nro_assento)) {
            setAssentosSelecionados((prev) => prev.filter((assento) => assento !== nro_assento));
        } else {
            setAssentosSelecionados((prev) => [...prev, nro_assento]);
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

    // Divide os assentos em fileiras A e B
    const fileiraA = viagem.assentos.filter(assento => assento.nro_assento.startsWith('A'));
    const fileiraB = viagem.assentos.filter(assento => assento.nro_assento.startsWith('B'));

    return (
        <div className="container-selecao-assentos">
            <h3 className='text-white'> Selecionar Assentos - Viagem ID: {viagem.id}</h3>
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

            </div>
        </div>
    );
}

