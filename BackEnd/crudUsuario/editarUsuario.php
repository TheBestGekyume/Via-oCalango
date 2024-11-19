<?php
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexão falhou: " . $conn->connect_error]));
}

// Verifica se o método de requisição é PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se os campos necessários estão definidos
    if (!isset($data['id_usuario'], $data['nome'], $data['senha'], $data['email'], $data['tipo'])) {
        echo json_encode(["error" => "Campos obrigatórios ausentes. Certifique-se de enviar 'id_usuario', 'nome', 'senha', 'email', 'tipo'."]);
        $conn->close();
        exit;
    }

    // Escapa os dados para evitar injeção de SQL
    $id_usuario = (int)$data['id_usuario'];
    $nome = $conn->real_escape_string($data['nome']);
    $senha = $conn->real_escape_string($data['senha']);
    $email = $conn->real_escape_string($data['email']);
    $tipo = (int)$data['tipo'];

    // Prepara a query para atualizar o usuário
    $stmt = $conn->prepare("UPDATE usuario 
                            SET nome = ?, senha = ?, email = ?, tipo = ? 
                            WHERE id_usuario = ?");
    $stmt->bind_param("sssii", $nome, $senha, $email, $tipo, $id_usuario);

    // Executa a query
    if ($stmt->execute()) {
        echo json_encode(["success" => "Usuário atualizado com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro ao atualizar o usuário: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
