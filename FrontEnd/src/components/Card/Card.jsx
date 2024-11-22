import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.scss'; // Estilos para os cards, opcional

export function Card() {
    const [viagens, setViagens] = useState([]); 
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Faz a requisição para listar as viagens ao montar o componente
        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
            .then((response) => {
                // Supondo que a API retorna um array de viagens
                setViagens(response.data); 
            })
            .catch((error) => {
                console.error("Erro ao buscar as viagens:", error);
                setErro("Não foi possível carregar as viagens.");
            });
    }, []); // Executa apenas uma vez ao montar o componente

    return (
        <div className="card-container">
            {erro && <p className="error-message">{erro}</p>} {/* Exibe mensagem de erro, se houver */}
            {viagens.length > 0 ? (
                viagens.map((viagem, index) => (
                    <div className="card" key={index}>
                        <img src={viagem.imgUrl} alt={`${viagem.origem} - ${viagem.destino}`} className="card-image" />
                        <div className="card-content">
                            <h3>{viagem.origem} → {viagem.destino}</h3>
                            <p>Preço: R$ {viagem.preco.toFixed(2)}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Carregando viagens...</p> // Mensagem enquanto os dados são carregados
            )}
        </div>
    );
}
