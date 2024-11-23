import React, { useState } from 'react';
import './destinoUser.scss';
import origem from "../../assets/origem.png";
import date from "../../assets/date.png";
import destino from "../../assets/destino.png";

export function DestinoUser({setLocal}) {
    const [origemDestinoUser, setOrigemDestinoUser] = useState({
        origem: '',
        destino: '',
        ida: '',
        volta: ''
    });

    const eventOnChange = (e) => {
        const { name, value } = e.target;
        setOrigemDestinoUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const dataBrasil = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const validarOrigemDestino = (origem, destino) => {
        if (origem && destino) {
            return true;
        }
    }

    return (
        <div>
            <section className='section-destinoUser'>
                <div>
                    <p>Origem</p>
                    <div className='container-input-dest'>
                        <img
                            className='img-origem-user'
                            src={origem}
                            alt='icone origem'
                        />
                        <input
                            type='text'
                            name='origem'
                            value={origemDestinoUser.origem}
                            onChange={eventOnChange}
                            placeholder='Origem'
                            autoFocus
                        />
                    </div>
                </div>

                <div>
                    <p>Destino</p>
                    <div className='container-input-dest'>
                        <img
                            className='img-destino-user'
                            src={destino}
                            alt='icone destino'
                        />
                        <input
                            type='text'
                            name='destino'
                            value={origemDestinoUser.destino}
                            onChange={eventOnChange}
                            placeholder='Destino'
                        />
                    </div>
                </div>

                <div>
                    <p>Ida</p>
                    <div className='container-input-dest'>
                        <img
                            className='date-destino-user'
                            src={date}
                            alt='icone data'
                            onClick={() => document.getElementById("ida").showPicker()}
                        />
                        <input
                            type='date'
                            id='ida'
                            name='ida'
                            value={origemDestinoUser.ida}
                            onChange={eventOnChange}
                            min={new Date().toISOString().split('T')[0]}
                            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                        />
                        <span className="data-display">{dataBrasil(origemDestinoUser.ida) || "dd/mm/aaaa"}</span>
                    </div>
                </div>

                <div>
                    <p>Volta</p>
                    <div className='container-input-dest'>
                        <img
                            className='date-destino-user'
                            src={date}
                            alt='icone data'
                            onClick={() => document.getElementById("volta").showPicker()}
                        />
                        <input
                            type='date'
                            id='volta'
                            name='volta'
                            value={origemDestinoUser.volta}
                            onChange={eventOnChange}
                            min={origemDestinoUser.ida || new Date().toISOString().split('T')[0]}
                            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                        />
                        <span className="data-display">{dataBrasil(origemDestinoUser.volta) || "dd/mm/aaaa"}</span>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button onClick={() => {
                            if (validarOrigemDestino(origemDestinoUser.ida, origemDestinoUser.destino)) {
                                setLocal(origemDestinoUser.destino)
                            }
                        }} className='buscar-viagem'><span>Buscar viagem</span></button>
                    </div>
                </div>
            </section>
        </div>
    );
}
