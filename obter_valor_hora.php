<?php
include 'conexao.php';

$sql = "SELECT valor_hora FROM configuracoes";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
echo $row['valor_hora'];

$conn->close();
?>
