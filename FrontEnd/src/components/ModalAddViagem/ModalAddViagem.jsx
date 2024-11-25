import React, { useState } from 'react';
import './modalAddViagem.scss';
import axios from 'axios';

export function ModalAddViagem({ isOpen, onClose, refreshViagens }) {
  const [formData, setFormData] = useState({
    origem: '',
    destino: '',
    horario_de_partida: '',
    data_de_partida: '',
    preco: '',
    assentos: '',
    imgUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/viacaocalango/BackEnd/crudViagem/criarViagem.php', formData);
      alert(response.data.success || response.data.error);
      if (response.data.success) {
        onClose();
        refreshViagens(); // Atualiza a lista de viagens após adicionar nova viagem
      }
    } catch (error) {
      console.error("Erro ao adicionar viagem", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay vw-100">
      <div className="modal-content w-50">
        <button className="close-button px-3 m-2 fs-2 rounded-4" onClick={onClose}>X</button>
        <h2>Adicionar Nova Viagem</h2>

        <form onSubmit={handleSubmit}>
          <section className='border-0 d-flex flex-column align-items-center gap-3'>
            <div className='d-flex gap-2 align-items-end'>
              <label className='fs-5 pe-3'>Origem:</label>
              <input type="text" name="origem" value={formData.origem} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>Destino:</label>
              <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>Horário de Partida:</label>
              <input type="time" name="horario_de_partida" value={formData.horario_de_partida} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>Data de Partida:</label>
              <input type="date" name="data_de_partida" value={formData.data_de_partida} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>Preço:</label>
              <input type="number" name="preco" value={formData.preco} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>Número de Assentos:</label>
              <input type="number" name="assentos" value={formData.assentos} onChange={handleChange} required />
            </div>
            <div className='d-flex gap-2 align-items-end justify-content-start'>
              <label className='fs-5 pe-3'>URL da Imagem:</label>
              <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required />
            </div>
          </section>
          <button type="submit">Adicionar Viagem</button>
        </form>
      </div>
    </div>
  );
}
