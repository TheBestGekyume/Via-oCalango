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
              $data['preco'])) {

        $id_viagem = $data['id_viagem'];
        $origem = $data['origem'];
        $destino = $data['destino'];
        $horario_de_partida = $data['horario_de_partida'];
        $data_de_partida = $data['data_de_partida'];
        $preco = $data['preco'];


        // Obtém os assentos atuais do banco de dados
        $sql = "SELECT assentos FROM viagem WHERE id_viagem = $id_viagem";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Monta a query de atualização dos dados da viagem
            $sql_update = "UPDATE viagem 
                           SET origem = '$origem', 
                               destino = '$destino', 
                               horario_de_partida = '$horario_de_partida', 
                               data_de_partida = '$data_de_partida', 
                               preco = '$preco'
                           WHERE id_viagem = $id_viagem";

            // Executa a query de atualização
            if ($conn->query($sql_update) === TRUE) {
                echo "Viagem e assentos atualizados com sucesso!";
            } else {
                echo "Erro ao atualizar a viagem: " . $conn->error;
            }
        } else {
            echo "Viagem não encontrada!";
        }
    } else {
        echo "Dados incompletos. Certifique-se de enviar todos os dados necessários (origem, destino, horário, data, preço, status e assentos).";
    }
}

$conn->close();
?>
