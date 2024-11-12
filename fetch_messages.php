<?php
$host = 'localhost';
$dbname = 'chat_app';
$user = 'root';
$password = '';

// Connect to the database
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->query("SELECT user, message FROM messages ORDER BY timestamp DESC");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages);
?>