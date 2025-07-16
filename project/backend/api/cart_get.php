<?php
ini_set('session.cookie_path', '/');
session_start();
require_once '../config/config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_email'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

$user_email = $_SESSION['user_email'];
$sql = "SELECT * FROM cart WHERE user_email=?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_email]);
$cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cart);
?> 