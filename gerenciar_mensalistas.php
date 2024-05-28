<?php
include 'conexao.php';

// Processar ações (adicionar, editar, excluir)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action == 'add' || $action == 'edit') {
            $veiculo_id = $_POST['veiculo_id'];
            $nome = $_POST['nome'];
            $telefone = $_POST['telefone'];
            $valor_mensal = $_POST['valor_mensal'];
            $data_inicio = $_POST['data_inicio'];
            $data_fim = $_POST['data_fim'];

            $errors = [];

            if (empty($veiculo_id)) {
                $errors[] = "Selecione um veículo.";
            }
            if (empty($nome)) {
                $errors[] = "O nome é obrigatório.";
            }
            if (empty($valor_mensal) || !is_numeric($valor_mensal) || $valor_mensal <= 0) {
                $errors[] = "Valor mensal inválido.";
            }
            if (empty($data_inicio)) {
                $errors[] = "A data de início é obrigatória.";
            }

            if (empty($errors)) {
                if ($action == 'add') {
                    $sql = "INSERT INTO mensalistas (veiculo_id, nome, telefone, valor_mensal, data_inicio, data_fim) 
                            VALUES ('$veiculo_id', '$nome', '$telefone', '$valor_mensal', '$data_inicio', '$data_fim')";
                } else {
                    $id = $_POST['id'];
                    $sql = "UPDATE mensalistas SET veiculo_id = '$veiculo_id', nome = '$nome', telefone = '$telefone', 
                            valor_mensal = '$valor_mensal', data_inicio = '$data_inicio', data_fim = '$data_fim' 
                            WHERE id = $id";
                }

                if ($conn->query($sql) === TRUE) {
                    header("Location: gerenciar_mensalistas.php?success=Operação realizada com sucesso!");
                    exit();
                } else {
                    echo "Erro: " . $sql . "<br>" . $conn->error;
                }
            } else {
                foreach ($errors as $error) {
                    echo "<p class='error-message' style='color: red;'>$error</p>";
                }
            }
        } elseif ($action == 'delete') {
            $id = $_POST['id'];
            $sql = "DELETE FROM mensalistas WHERE id = $id";
            if ($conn->query($sql) === TRUE) {
                header("Location: gerenciar_mensalistas.php?success=Mensalista excluído com sucesso!");
                exit();
            } else {
                echo "Erro ao excluir mensalista: " . $conn->error;
            }
        }
    }
}

// Obter lista de veículos para o dropdown
$sql = "SELECT id, placa FROM veiculos";
$result = $conn->query($sql);
$veiculos = $result->fetch_all(MYSQLI_ASSOC);

// Obter dados do mensalista para edição (se houver)
$mensalista = null;
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $sql = "SELECT * FROM mensalistas WHERE id = $id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $mensalista = $result->fetch_assoc();
    }
}

// Obter mensalidades próximas do vencimento (próximos 7 dias)
$sql = "SELECT m.*, v.placa 
        FROM mensalistas m 
        INNER JOIN veiculos v ON m.veiculo_id = v.id 
        WHERE DATEDIFF(data_fim, CURDATE()) BETWEEN 0 AND 7";
$result = $conn->query($sql);
$mensalidadesVencendo = $result->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Gerenciar Mensalistas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Gerenciar Mensalistas</h1>

        <?php if (isset($_GET['success'])): ?>
            <p class="success-message" style="color: green;"><?php echo $_GET['success']; ?></p>
        <?php endif; ?>
        
        <h2>Mensalidades Próximas do Vencimento:</h2>
        <?php if (!empty($mensalidadesVencendo)): ?>
            <ul>
                <?php foreach ($mensalidadesVencendo as $mensalidade): ?>
                    <li><?php echo $mensalidade['placa'] . " - " . $mensalidade['nome'] . " (Vence em: " . $mensalidade['data_fim'] . ")"; ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p>Nenhuma mensalidade próxima do vencimento.</p>
        <?php endif; ?>

        <h2><?php echo $mensalista ? 'Editar Mensalista' : 'Adicionar Mensalista'; ?></h2>
        <form action="gerenciar_mensalistas.php" method="post">
            </form>

        <h2>Lista de Mensalistas</h2>
        <table border="1">
            <tr>
                <th>Veículo</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Valor Mensal</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Ações</th>
            </tr>
            <?php
            $sql = "SELECT m.*, v.placa FROM mensalistas m INNER JOIN veiculos v ON m.veiculo_id = v.id";
            $result = $conn->query($sql);
            while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo $row['placa']; ?></td>
                    <td><?php echo $row['nome']; ?></td>
                    <td><?php echo $row['telefone']; ?></td>
                    <td>R$ <?php echo number_format($row['valor_mensal'], 2); ?></td>
                    <td><?php echo $row['data_inicio']; ?></td>
                    <td><?php echo $row['data_fim']; ?></td>
                    <td>
                        <a href="?edit=<?php echo $row['id']; ?>">Editar</a> |
                        <form action="gerenciar_mensalistas.php" method="post" style="display: inline;">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                            <input type="submit" value="Excluir" onclick="return confirm('Tem certeza que deseja excluir este mensalista?');">
                        </form>
                    </td>
                </tr>
            <?php endwhile; ?>
        </table>

        <br>
        <a href="index.php">Voltar para a página inicial</a>
    </div>

    <script src="script_mensalista.js"></script> 
</body>
</html>
