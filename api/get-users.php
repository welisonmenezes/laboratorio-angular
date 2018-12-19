<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

include 'database-conection.php';

$query = "SELECT * FROM `user`";
$stmt = $conn->prepare($query);
$stmt->execute();
$count = $stmt->rowCount();

$users = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	array_push($users, $row);
}

echo json_encode($users);
?>