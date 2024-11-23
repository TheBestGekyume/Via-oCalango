import React from 'react';
import "./passagemInfo.scss";
import map from "../../assets/map.png";

export function PassagemInfo({ setDetalhesViagem }) {
    return (
        <>
            <section className='container-passagem-info'>
                <div style={{ display: "flex", alignItems: 'flex-start' }}>
                    <img className='map-passagem-info' src={map} />
                    <div>
                        <p>São Paulo</p>
                        <p>São Paulo</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>A partir de<strong> 200.00</strong></p>
                    <button onClick={() => setDetalhesViagem(true)} className='button-horarios-passagem-info'><span>Ver horários</span></button>
                </div>
            </section>
        </>
    )
}
