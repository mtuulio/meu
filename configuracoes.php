<?php
include 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados

// Verifica se o formulário de atualização foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $novo_valor_hora = $_POST['novo_valor_hora'];

    // Atualiza o valor da hora na tabela de configurações
    $sql = "UPDATE configuracoes SET valor_hora = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("d", $novo_valor_hora);

    if ($stmt->execute()) {
        $mensagem = "Valor da hora atualizado para R$ " . number_format($novo_valor_hora, 2);
    } else {
        $erro = "Erro ao atualizar o valor da hora: " . $stmt->error;
    }
}

// Consulta o valor atual da hora na tabela de configurações
$sql = "SELECT valor_hora FROM configuracoes";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$valor_hora_atual = $row['valor_hora'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Configurações</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Configurações</h1>

        <?php if (isset($mensagem)): ?>
            <p class="success-message"><?php echo $mensagem; ?></p>
        <?php endif; ?>
        <?php if (isset($erro)): ?>
            <p class="error-message"><?php echo $erro; ?></p>
        <?php endif; ?>

        <form id="configuracoes-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <label for="novo_valor_hora">Novo Valor da Hora:</label>
            <input type="number" id="novo_valor_hora" name="novo_valor_hora" step="0.01" min="0" value="<?php echo $valor_hora_atual; ?>" required>
            <input type="submit" value="Atualizar">
        </form>

        <br>
        <a href="index.php">Voltar para a página inicial</a>
    </div>
</body>
</html>
