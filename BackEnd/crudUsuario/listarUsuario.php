<?php

$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Consulta para buscar todos os usuários
$sql = "SELECT * FROM usuario";
$result = $conn->query($sql);

$usuarios = [];

// Verifica se há resultados e popula o array de usuários
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Adiciona os dados do banco de dados ao array
        $usuarios[] = [
            'id_usuario' => $row['id_usuario'],
            'nome' => $row['nome'],
            'email' => $row['email'],
            'tipo' => $row['tipo']
        ];
    }
}

// Fecha a conexão com o banco de dados
$conn->close();

// Define o tipo de conteúdo como JSON
header('Content-Type: application/json');

// Retorna os usuários como JSON
echo json_encode($usuarios);
?>
