<?php
// Conexión a la base de datos
$servername = "datagato.abdielaldana.com";
$username = "abdiela2_gatox1";
$password = "Superman.9494";
$dbname = "abdiela2_tresenraya";
$conn = new mysqli($servername, $username, $password, $dbname);

// Crear una nueva partida
// if ($_POST['accion'] == 'crear_partida') {
//     $jugador1 = $_POST['jugador1'];
//     $sql = "INSERT INTO partidas (jugador1) VALUES ('$jugador1')";
//     $conn->query($sql);
//     $id_partida = $conn->insert_id;
//     echo json_encode(['id_partida' => $id_partida]);
//     echo json_encode(['id_partida' => "hola"]);
// }
if ($_POST['accion'] == 'crear_partida') {
    echo "Hola desde PHP";
}

// Unirse a una partida existente
if ($_POST['accion'] == 'unirse_partida') {
    $jugador2 = $_POST['jugador2'];
    $id_partida = $_POST['id_partida'];
    $sql = "UPDATE partidas SET jugador2='$jugador2' WHERE id=$id_partida";
    $conn->query($sql);
    // Obtener estado actual del juego
    $sql = "SELECT * FROM partidas WHERE id=$id_partida";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode($row);
}

// Actualizar el tablero de la partida
if ($_POST['accion'] == 'actualizar_tablero') {
    $id_partida = $_POST['id_partida'];
    $tablero = $_POST['tablero'];
    $turno = $_POST['turno'];
    $estado = $_POST['estado'];
    $sql = "UPDATE partidas SET tablero='$tablero', turno='$turno', estado='$estado' WHERE id=$id_partida";
    $conn->query($sql);
    echo json_encode(['success' => true]);
}

$conn->close();
?>
