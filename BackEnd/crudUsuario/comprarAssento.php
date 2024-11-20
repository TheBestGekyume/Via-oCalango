<?php
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se o método de requisição é PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados necessários foram enviados
    if (isset($data['id_viagem'], $data['assentos_indisponiveis'], $data['usuario_id'])) {

        $id_viagem = $data['id_viagem'];
        $assentos_indisponiveis = $data['assentos_indisponiveis'];
        $usuario_id = $data['usuario_id'];

        // Atualiza os assentos na viagem
        $sql = "SELECT assentos FROM viagem WHERE id_viagem = $id_viagem";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $assentos = json_decode($row['assentos'], true); // Converte os assentos de JSON para um array

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

            // Monta a query de atualização da viagem
            $sql_update = "UPDATE viagem 
                           SET assentos = '$assentos_json' 
                           WHERE id_viagem = $id_viagem";

            // Executa a query de atualização
            if ($conn->query($sql_update) === TRUE) {
                echo "Assentos atualizados com sucesso! ";

                // Inserir dados na tabela intermediária usuario_viagem
                $sql_insert = "INSERT INTO usuario_viagem (usuario_id, viagem_id) 
                               VALUES ($usuario_id, $id_viagem)";

                if ($conn->query($sql_insert) === TRUE) {
                    echo "Usuário relacionado à viagem com sucesso!";
                } else {
                    echo "Erro ao associar usuário à viagem: " . $conn->error;
                }
            } else {
                echo "Erro ao atualizar os assentos: " . $conn->error;
            }
        } else {
            echo "Viagem não encontrada!";
        }
    } else {
        echo "Dados incompletos. Certifique-se de enviar 'id_viagem', 'assentos_indisponiveis' e 'usuario_id'.";
    }
}

$conn->close();
?>
