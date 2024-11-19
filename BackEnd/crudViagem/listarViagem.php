<?php

$conn = new mysqli("localhost", "root", "", "viacaocalango");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$sql = "SELECT * FROM viagem";
$result = $conn->query($sql);

$viagens = [];

// Verifica se há resultados e popula o array de viagens
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Adiciona os dados do banco de dados ao array
        $viagens[] = [
            'id_viagem' => $row['id_viagem'],
            'origem' => $row['origem'],
            'destino' => $row['destino'],
            'horario_de_partida' => $row['horario_de_partida'],
            'data_de_partida' => $row['data_de_partida'],
            'assentos' => $row['assentos'],
            'preco' => $row['preco'],
            'status' => $row['status']
        ];
    }
}


// Fecha a conexão com o banco de dados
$conn->close();

// Define o tipo de conteúdo como JSON
header('Content-Type: application/json');

// Retorna as viagens como JSON
echo json_encode($viagens);
?>
