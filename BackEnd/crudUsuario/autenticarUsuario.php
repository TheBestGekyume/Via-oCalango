<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS, GET, PUT"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Obtém os dados da requisição POST
    if (isset($data['email'], $data['senha'])) {
        $email = $data['email'];
        $senha = $data['senha'];

        // Prepara a query de autenticação
        $stmt = $conn->prepare("SELECT nome, tipo FROM usuario WHERE email = ? AND senha = ?");
        $stmt->bind_param("ss", $email, $senha);
        $stmt->execute();
        $stmt->store_result();

        // Verifica se o usuário foi encontrado
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($nome, $tipo);
            $stmt->fetch();

            // Retorna os dados do usuário em JSON
            echo json_encode([
                "status" => 200,
                "mensagem" => "Autenticação bem-sucedida",
                "nome" => $nome,
                "tipo" => $tipo
            ]);
        } else {
            // Retorna erro 404 caso o usuário não exista ou a senha esteja incorreta
            http_response_code(404);
            echo json_encode([
                "status" => 404,
                "mensagem" => "Usuário não encontrado ou senha incorreta"
            ]);
        }
        
        $stmt->close();
    } else {
        // Retorna erro 400 se os dados estiverem ausentes
        http_response_code(400);
        echo json_encode([
            "status" => 400,
            "mensagem" => "Dados de autenticação incompletos"
        ]);
    }
}

$conn->close();
?>
