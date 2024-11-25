<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS, GET, PUT"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

$conn = new mysqli("localhost", "root", "", "viacaocalango");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$sql = "SELECT * FROM viagem ORDER BY id_viagem DESC";
$result = $conn->query($sql);

$viagens = [];

// Verifica se há resultados e popula o array de viagens
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Decodifica a coluna 'assentos' que está armazenada como string JSON
        $assentos = json_decode($row['assentos'], true); // Transforma a string JSON em um array de objetos
        
        $viagens[] = [
            'id_viagem' => $row['id_viagem'],
            'origem' => $row['origem'],
            'destino' => $row['destino'],
            'horario_de_partida' => $row['horario_de_partida'],
            'data_de_partida' => $row['data_de_partida'],
            'assentos' => $assentos,  // Agora 'assentos' é um array de objetos
            'preco' => $row['preco'],
            'status' => $row['status'],
            'imgUrl' => isset($row['imgUrl']) ? $row['imgUrl'] : null // Verifica se 'imgUrl' existe
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
