<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$user_id = $_POST['user_id'] ?? null;
$product_id = $_POST['product_id'] ?? null;
$quantity = $_POST['quantity'] ?? null;

if (!$user_id || !$product_id || !$quantity) {
    echo json_encode(['success' => false, 'message' => 'Thiếu user_id, product_id hoặc quantity']);
    exit;
}

try {
    $sql = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$quantity, $user_id, $product_id]);
    echo json_encode(['success' => true, 'message' => 'Đã cập nhật số lượng']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} 