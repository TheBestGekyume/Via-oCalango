<?php
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se o método de requisição é PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se os campos necessários estão definidos
    if (isset($data['id_viagem'], $data['origem'], $data['destino'],
    $data['horario_de_partida'], $data['data_de_partida'], 
    $data['preco'], $data['status'], $data['assentos'])) {
        $id_viagem = $data['id_viagem']; // ID do registro a ser editado
        $origem = $data['origem'];
        $destino = $data['destino'];
        $horario_de_partida = $data['horario_de_partida'];
        $data_de_partida = $data['data_de_partida'];
        $preco = $data['preco'];
        $status = $data['status'];
        $assentos = $data['assentos'];

        // Monta a query de atualização
        $sql = "UPDATE viagem 
                SET origem = '$origem', destino = '$destino', 
                    horario_de_partida = '$horario_de_partida', 
                    data_de_partida = '$data_de_partida', 
                    preco = '$preco', status = '$status',
                    assentos = '$status'
                WHERE id_viagem = $id_viagem";

        if ($conn->query($sql) === TRUE) {
            echo "Viagem atualizada com sucesso!";
        } else {
            echo "Erro ao atualizar a viagem: " . $conn->error;
        }
    } else {
        echo "Dados incompletos. Certifique-se de enviar 'id_viagem', 'origem', 'destino', 'horario_de_partida', 'data_de_partida', 'assentos', 'preco' e 'status'.";
    }
}

$conn->close();
?>
