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
$product_id = $_POST['product_id'];

$sql = "DELETE FROM cart WHERE user_email=? AND product_id=?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_email, $product_id]);

echo json_encode(['success' => true]);
?> 