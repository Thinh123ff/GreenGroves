<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user']['email'])) {
    echo json_encode(['success' => false, 'cart' => []]);
    exit;
}
$email = $_SESSION['user']['email'];
require_once '../../project/backend/config/config.php';
$conn = getDb();
$stmt = $conn->prepare('SELECT product_id, quantity FROM cart WHERE user_email = ?');
$stmt->execute([$email]);
$cart = $stmt->fetchAll();
echo json_encode(['success' => true, 'cart' => $cart]); 