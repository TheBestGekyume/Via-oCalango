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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Adicionar Nova Viagem</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Origem:
            <input type="text" name="origem" value={formData.origem} onChange={handleChange} required />
          </label>
          <label>
            Destino:
            <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
          </label>
          <label>
            Horário de Partida:
            <input type="time" name="horario_de_partida" value={formData.horario_de_partida} onChange={handleChange} required />
          </label>
          <label>
            Data de Partida:
            <input type="date" name="data_de_partida" value={formData.data_de_partida} onChange={handleChange} required />
          </label>
          <label>
            Preço:
            <input type="number" name="preco" value={formData.preco} onChange={handleChange} required />
          </label>
          <label>
            Número de Assentos:
            <input type="number" name="assentos" value={formData.assentos} onChange={handleChange} required />
          </label>
          <label>
            URL da Imagem:
            <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required />
          </label>
          <button type="submit">Adicionar Viagem</button>
        </form>
      </div>
    </div>
  );
}
