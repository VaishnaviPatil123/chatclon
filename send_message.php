<?php
$host = 'localhost';
$dbname = 'chat_app';
$user = 'root';
$password = '';

// Connect to the database
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Retrieve data from the POST request
$data = json_decode(file_get_contents("php://input"));

if ($data->username && $data->message) {
    $stmt = $pdo->prepare("INSERT INTO messages (user, message) VALUES (:user, :message)");
    $stmt->execute(['user' => $data->username, 'message' => $data->message]);
}

echo json_encode(["status" => "Message sent"]);
?>