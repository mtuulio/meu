<?php
include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $placa = $_POST['placa'];

    // Obter dados do veículo (incluindo data_entrada e mensalista)
    $sql = "SELECT id, data_entrada, mensalista FROM veiculos WHERE placa = ? AND data_saida IS NULL";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $placa);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row['id'];
        $data_entrada = $row['data_entrada'];
        $mensalista = $row['mensalista'];

        // Obter valor por hora da tabela de configurações
        $sql = "SELECT valor_hora FROM configuracoes";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $valor_hora = $row['valor_hora'];

        // Registrar saída e calcular valor (se não for mensalista)
        $data_saida = date('Y-m-d H:i:s');
        $valor = 0;

        if (!$mensalista) {
            // Calcular a diferença em horas usando TIMESTAMPDIFF
            $sql = "SELECT TIMESTAMPDIFF(HOUR, ?, ?) AS horas_estacionado";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $data_entrada, $data_saida);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $horas_estacionado = $row['horas_estacionado'];

                // Se o tempo for menor que uma hora, cobra o valor de uma hora
                if ($horas_estacionado == 0) {
                    $horas_estacionado = 1;
                }

                $valor = $horas_estacionado * $valor_hora;
            }
        }

        // Atualizar dados do veículo no banco de dados
        $sql = "UPDATE veiculos SET data_saida = ?, valor = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdi", $data_saida, $valor, $id);

        if ($stmt->execute()) {
            echo "Saída registrada com sucesso! Valor a pagar: R$ " . number_format($valor, 2);
        } else {
            echo "Erro ao registrar saída: " . $stmt->error;
        }
    } else {
        echo "Veículo não encontrado no estacionamento!";
    }
}

$conn->close();
?>
