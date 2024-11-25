import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./minhasViagens.scss";

export function MinhasViagens() {
    const [viagens, setViagens] = useState([]);
    const [error, setError] = useState('');

    // Função que irá fazer a requisição para pegar as viagens e assentos
    const fetchViagens = async () => {
        try {
            const usuarioId = sessionStorage.getItem('id_usuario'); // Pega o id_usuario da sessionLocation

            if (!usuarioId) {
                setError("ID do usuário não encontrado.");
                return;
            }

            const viagensResponse = await axios.post('http://localhost/viacaocalango/BackEnd/crudUsuario/listarViagensusuario.php', {
                usuario_id: usuarioId
            });

            const viagensData = viagensResponse.data;

            console.log(viagensData); // Verifique a estrutura da resposta

            if (viagensData.viagens && viagensData.viagens.length > 0) {
                setViagens(viagensData.viagens); // Atualiza o estado com as viagens
            } else {
                setError("Você ainda não comprou nenhuma viagem.");
            }

            setError(''); // Limpa qualquer erro

        } catch (err) {
            console.error("Erro ao buscar as viagens:", err);
            setError('Erro ao carregar as suas viagens. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchViagens();
    }, []);

    return (
        <>
            <h1 className="text-white p-3">Minhas Viagens</h1>

            <div className="row p-3">
                {error && <div className="alert alert-danger w-100">{error}</div>}

                {viagens.length === 0 ? (
                    <div className="alert alert-warning w-100">Você ainda não comprou nenhuma viagem.</div>
                ) : (
                    viagens.map((viagem, index) => (
                        <div className="col-6 mb-4" key={index}>
                            <div className="card text-bg-warning">
                                <div className="card-body">
                                    <h5 className="card-title">{viagem.origem} → {viagem.destino}</h5>
                                    <p className="card-text">
                                        <strong>Data:</strong> {viagem.data_de_partida} <br /> <br />
                                        <strong>Horário:</strong> {viagem.horario_de_partida} <br /> <br />
                                        <strong>Valor Pago:</strong> R$ {parseFloat(viagem.preco).toFixed(2)} <br /> <br />
                                        <strong>Assentos:</strong>
                                        {viagem.assentos && viagem.assentos.length > 0 ? (
                                            viagem.assentos.map((assento, idx) => (
                                                <span key={idx} className="bg-secondary rounded-2 ms-1 me-2 p-1">{assento}</span>
                                            ))
                                        ) : (
                                            <span>Sem assentos comprados</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
