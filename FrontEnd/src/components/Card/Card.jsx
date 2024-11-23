import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.scss';
import { Load } from '../Load';


export function Card() {
    const [viagens, setViagens] = useState([]);
    const [erro, setErro] = useState(null);
    const [LoadAnimation, setLoadAnimation] = useState(true);

    useEffect(() => {
        axios.get('http://localhost/viacaocalango/BackEnd/crudViagem/listarViagem.php')
        .then((response) => {
            setViagens(response.data || []);
            setLoadAnimation(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar as viagens:", error);
                setErro("Não foi possível carregar as viagens.");
                setLoadAnimation(false);
            });
    }, []);

    return (
        <div id="card" className="container px-3">
            <div className="row">
                {erro && (
                    <div className="col-12">
                        <div className="alert alert-danger text-center">{erro}</div>
                    </div>
                )}
                {LoadAnimation ? (
                    <div className="col-12 text-center">
                        <Load />
                    </div>
                ) : (
                    viagens.length > 0 ? (
                        viagens.map((viagem, index) => (
                            <div className="col-md-6 my-4" key={index}>
                                <div className="card h-100 border- bg-transparent d-flex">
                                    <img
                                        src={viagem.imgUrl}
                                        className="card-img rounded-5 height-limit"
                                        alt={`${viagem.origem} - ${viagem.destino}`}
                                    />
                                    <div className="card-body flex-grow-0 flex-fill bg-warning mt-3 rounded-5">
                                        <h5 className="card-title text-white ">{viagem.origem} → {viagem.destino}</h5>
                                        <p className="card-text fw-bolder">
                                            Data: {viagem.data_de_partida}<br />
                                            Horário: {viagem.horario_de_partida}<br />
                                            Preço: R$ {parseFloat(viagem.preco).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>Não há viagens disponíveis.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
