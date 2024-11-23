-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/11/2024 às 01:14
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `viacaocalango`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `senha`, `email`, `tipo`) VALUES
(1, 'jorge da silva', '123123', 'jorge@hotmail.com', 0),
(2, 'adm', '123', 'adm@gmail.com', 1),
(5, 'gekyume', '666', 'gekyume@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_viagem`
--

CREATE TABLE `usuario_viagem` (
  `usuario_viagem_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `viagem_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `viagem`
--

CREATE TABLE `viagem` (
  `id_viagem` int(11) NOT NULL,
  `imgUrl` varchar(200) NOT NULL,
  `origem` varchar(50) NOT NULL,
  `destino` varchar(50) NOT NULL,
  `horario_de_partida` varchar(20) NOT NULL,
  `data_de_partida` varchar(20) NOT NULL,
  `assentos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`assentos`)),
  `preco` float NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `viagem`
--

INSERT INTO `viagem` (`id_viagem`, `imgUrl`, `origem`, `destino`, `horario_de_partida`, `data_de_partida`, `assentos`, `preco`, `status`) VALUES
(21, 'https://content.r9cdn.net/rimg/dimg/f3/ac/2ca2def3-city-26168-164fc0204f5.jpg', 'Rio de Janeiro - RJ', 'Salvador - BA', '04:50', '10/01/2025', '[{\"nro_assento\":\"A1\",\"disponivel\":true},{\"nro_assento\":\"A2\",\"disponivel\":true},{\"nro_assento\":\"A3\",\"disponivel\":true},{\"nro_assento\":\"A4\",\"disponivel\":true},{\"nro_assento\":\"A5\",\"disponivel\":true},{\"nro_assento\":\"B1\",\"disponivel\":true},{\"nro_assento\":\"B2\",\"disponivel\":true},{\"nro_assento\":\"B3\",\"disponivel\":true},{\"nro_assento\":\"B4\",\"disponivel\":true},{\"nro_assento\":\"B5\",\"disponivel\":true}]', 120.5, 1),
(22, 'https://www.pjf.mg.gov.br/noticias/arquivo/0609_sedic_ranking_112728.jpg', 'São Paulo - SP', 'Juiz de Fora - MG', '04:50', '10/01/2025', '[{\"nro_assento\":\"A1\",\"disponivel\":true},{\"nro_assento\":\"A2\",\"disponivel\":true},{\"nro_assento\":\"A3\",\"disponivel\":true},{\"nro_assento\":\"A4\",\"disponivel\":true},{\"nro_assento\":\"A5\",\"disponivel\":true},{\"nro_assento\":\"B1\",\"disponivel\":true},{\"nro_assento\":\"B2\",\"disponivel\":true},{\"nro_assento\":\"B3\",\"disponivel\":true},{\"nro_assento\":\"B4\",\"disponivel\":true},{\"nro_assento\":\"B5\",\"disponivel\":true}]', 120.5, 1),
(23, 'https://www.sienge.com.br/wp-content/uploads/2023/11/bairros-mais-caros-de-belo-horizonte.jpg', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', '09:00', '15/01/2025', '[{\"nro_assento\":\"A1\",\"disponivel\":true},{\"nro_assento\":\"A2\",\"disponivel\":true},{\"nro_assento\":\"A3\",\"disponivel\":true},{\"nro_assento\":\"A4\",\"disponivel\":true},{\"nro_assento\":\"A5\",\"disponivel\":true},{\"nro_assento\":\"A6\",\"disponivel\":true},{\"nro_assento\":\"A7\",\"disponivel\":true},{\"nro_assento\":\"B0.5\",\"disponivel\":true},{\"nro_assento\":\"B1.5\",\"disponivel\":true},{\"nro_assento\":\"B2.5\",\"disponivel\":true},{\"nro_assento\":\"B3.5\",\"disponivel\":true},{\"nro_assento\":\"B4.5\",\"disponivel\":true},{\"nro_assento\":\"B5.5\",\"disponivel\":true},{\"nro_assento\":\"B6.5\",\"disponivel\":true},{\"nro_assento\":\"B7.5\",\"disponivel\":true}]', 150, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Índices de tabela `usuario_viagem`
--
ALTER TABLE `usuario_viagem`
  ADD PRIMARY KEY (`usuario_viagem_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `viagem_id` (`viagem_id`);

--
-- Índices de tabela `viagem`
--
ALTER TABLE `viagem`
  ADD PRIMARY KEY (`id_viagem`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuario_viagem`
--
ALTER TABLE `usuario_viagem`
  MODIFY `usuario_viagem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `viagem`
--
ALTER TABLE `viagem`
  MODIFY `id_viagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `usuario_viagem`
--
ALTER TABLE `usuario_viagem`
  ADD CONSTRAINT `usuario_viagem_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_viagem_ibfk_2` FOREIGN KEY (`viagem_id`) REFERENCES `viagem` (`id_viagem`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
