<?php
// Conectar ao banco de dados
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verificar conexão
if ($conn->connect_error) {
    die("Erro ao conectar ao banco de dados: " . $conn->connect_error);
}

// Função para excluir a viagem
function excluirViagem($idExcluir) {
    global $conn;

    // Preparar a consulta SQL para excluir a viagem
    $sql = "DELETE FROM viagem WHERE id_viagem = ?";

    // Preparar e vincular
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $idExcluir);

        // Executar e verificar se foi bem-sucedido
        if ($stmt->execute()) {
            $stmt->close();
            return ["status" => "success", "message" => "Viagem excluída com sucesso!"];
        } else {
            $stmt->close();
            return ["status" => "error", "message" => "Erro ao excluir a viagem: " . $stmt->error];
        }
    } else {
        return ["status" => "error", "message" => "Erro ao preparar a consulta: " . $conn->error];
    }
}

// Lógica principal para requisição POST
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Recebe os dados do corpo da requisição (JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se o ID da viagem foi passado
    if (isset($data["id_viagem"])) {
        $id_viagem = $data["id_viagem"];
        $response = excluirViagem($id_viagem);
    } else {
        $response = ["status" => "error", "message" => "ID da viagem não fornecido."];
    }

    // Retorna a resposta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
