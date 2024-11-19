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
              $data['preco'], $data['status'], $data['assentos_indisponiveis'])) {

        $id_viagem = $data['id_viagem'];
        $origem = $data['origem'];
        $destino = $data['destino'];
        $horario_de_partida = $data['horario_de_partida'];
        $data_de_partida = $data['data_de_partida'];
        $preco = $data['preco'];
        $status = $data['status'];
        $assentos_indisponiveis = $data['assentos_indisponiveis'];

        // Obtém os assentos atuais do banco de dados
        $sql = "SELECT assentos FROM viagem WHERE id_viagem = $id_viagem";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $assentos = json_decode($row['assentos'], true);

            // Atualiza os assentos que ficaram indisponíveis
            foreach ($assentos_indisponiveis as $assento_indisponivel) {
                foreach ($assentos as &$assento) {
                    if ($assento['nro_assento'] === $assento_indisponivel['nro_assento']) {
                        $assento['disponivel'] = false; // Marca o assento como indisponível
                        break;
                    }
                }
            }

            // Converte os assentos de volta para JSON
            $assentos_json = json_encode($assentos);

            // Monta a query de atualização dos dados da viagem
            $sql_update = "UPDATE viagem 
                           SET origem = '$origem', 
                               destino = '$destino', 
                               horario_de_partida = '$horario_de_partida', 
                               data_de_partida = '$data_de_partida', 
                               preco = '$preco', 
                               status = '$status', 
                               assentos = '$assentos_json'
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
