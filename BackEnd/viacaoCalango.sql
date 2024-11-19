-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/11/2024 às 00:56
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
(2, 'adm', '123', 'adm@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_viagem`
--

CREATE TABLE `usuario_viagem` (
  `usuario_id` int(11) NOT NULL,
  `viagem_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario_viagem`
--

INSERT INTO `usuario_viagem` (`usuario_id`, `viagem_id`, `status`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `viagem`
--

CREATE TABLE `viagem` (
  `id_viagem` int(11) NOT NULL,
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

INSERT INTO `viagem` (`id_viagem`, `origem`, `destino`, `horario_de_partida`, `data_de_partida`, `assentos`, `preco`, `status`) VALUES
(1, 'Rio de Janeiro', 'São Paulo', '08:00', '2024-11-25', '[{\"nro_assento\":\"A1\",\"disponivel\":true},{\"nro_assento\":\"A2\",\"disponivel\":false},{\"nro_assento\":\"B1\",\"disponivel\":true}]', 150.5, 1),
(11, 'testerrr', 'teste', '10:00:00', '2077-11-20', '0', 2.75, 0),
(17, 'testerrr', 'teste', '10:00:00', '2077', '100', 2, 1),
(18, 'Rio de Janeiro', 'São Paulo', '08:00', '2024-11-25', '[{\"nro_assento\":\"A1\",\"disponivel\":true},{\"nro_assento\":\"A2\",\"disponivel\":true},{\"nro_assento\":\"A3\",\"disponivel\":true},{\"nro_assento\":\"A4\",\"disponivel\":true},{\"nro_assento\":\"A5\",\"disponivel\":true},{\"nro_assento\":\"A6\",\"disponivel\":true},{\"nro_assento\":\"A7\",\"disponivel\":true},{\"nro_assento\":\"A8\",\"disponivel\":true},{\"nro_assento\":\"A9\",\"disponivel\":true},{\"nro_assento\":\"A10\",\"disponivel\":true},{\"nro_assento\":\"B1\",\"disponivel\":true},{\"nro_assento\":\"B2\",\"disponivel\":true},{\"nro_assento\":\"B3\",\"disponivel\":true},{\"nro_assento\":\"B4\",\"disponivel\":true},{\"nro_assento\":\"B5\",\"disponivel\":true},{\"nro_assento\":\"B6\",\"disponivel\":true},{\"nro_assento\":\"B7\",\"disponivel\":true},{\"nro_assento\":\"B8\",\"disponivel\":true},{\"nro_assento\":\"B9\",\"disponivel\":true},{\"nro_assento\":\"B10\",\"disponivel\":true}]', 150.5, 1);

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
  ADD PRIMARY KEY (`usuario_id`,`viagem_id`),
  ADD KEY `fk_viagem` (`viagem_id`);

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
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `viagem`
--
ALTER TABLE `viagem`
  MODIFY `id_viagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `usuario_viagem`
--
ALTER TABLE `usuario_viagem`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_viagem` FOREIGN KEY (`viagem_id`) REFERENCES `viagem` (`id_viagem`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
