<?php
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Obtém os dados da requisição POST
    if (isset($data['origem'], $data['destino'], $data['horario_de_partida'], $data['data_de_partida'], $data['preco'])) {
        $origem = $data['origem'];
        $destino = $data['destino'];
        $horario_de_partida = $data['horario_de_partida'];
        $data_de_partida = $data['data_de_partida'];
        $preco = $data['preco'];
    }
    // Monta a query de inserção
    $sql = "INSERT INTO viagem (origem, destino, horario_de_partida, data_de_partida, preco) 
            VALUES ('$origem', '$destino', '$horario_de_partida', '$data_de_partida', '$preco')";

    if ($conn->query($sql) === TRUE) {
        echo "Nova viagem inserida com sucesso!";
    } else {
        echo "Erro ao inserir a viagem: " . $conn->error;
    }
}

$conn->close();
?>
