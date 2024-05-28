<?php
include 'conexao.php';

// Processar ações (adicionar, editar, excluir)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action == 'add' || $action == 'edit') {
            // ... (código para adicionar ou editar mensalista - semelhante ao cadastro_mensalista.php) ...
        } elseif ($action == 'delete') {
            // ... (código para excluir mensalista) ...
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
    // ... (código para obter dados do mensalista para edição) ...
}
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

        <h2><?php echo $mensalista ? 'Editar Mensalista' : 'Adicionar Mensalista'; ?></h2>
        <form action="gerenciar_mensalistas.php" method="post">
            <input type="hidden" name="action" value="<?php echo $mensalista ? 'edit' : 'add'; ?>">
            <?php if ($mensalista): ?>
                <input type="hidden" name="id" value="<?php echo $mensalista['id']; ?>">
            <?php endif; ?>

            <label for="veiculo_id">Veículo:</label>
            <select id="veiculo_id" name="veiculo_id">
                <option value="">Selecione um veículo</option>
                <?php foreach ($veiculos as $veiculo): ?>
                    <option value="<?php echo $veiculo['id']; ?>" <?php echo ($mensalista && $mensalista['veiculo_id'] == $veiculo['id']) ? 'selected' : ''; ?>>
                        <?php echo $veiculo['placa']; ?>
                    </option>
                <?php endforeach; ?>
            </select><br><br>

            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="<?php echo $mensalista ? $mensalista['nome'] : ''; ?>" required><br><br>

            <label for="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value="<?php echo $mensalista ? $mensalista['telefone'] : ''; ?>"><br><br>

            <label for="valor_mensal">Valor Mensal:</label>
            <input type="number" id="valor_mensal" name="valor_mensal" value="<?php echo $mensalista ? $mensalista['valor_mensal'] : ''; ?>" required><br><br>

            <label for="data_inicio">Data de Início:</label>
            <input type="date" id="data_inicio" name="data_inicio" value="<?php echo $mensalista ? $mensalista['data_inicio'] : ''; ?>" required><br><br>

            <label for="data_fim">Data de Fim:</label>
            <input type="date" id="data_fim" name="data_fim" value="<?php echo $mensalista ? $mensalista['data_fim'] : ''; ?>"><br><br>

            <input type="submit" value="<?php echo $mensalista ? 'Salvar' : 'Adicionar'; ?>">
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
