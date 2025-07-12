<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$user_id = $_POST['user_id'] ?? null;
$product_id = $_POST['product_id'] ?? null;

if (!$user_id || !$product_id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu user_id hoặc product_id']);
    exit;
}

try {
    $sql = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user_id, $product_id]);
    echo json_encode(['success' => true, 'message' => 'Đã xóa sản phẩm khỏi giỏ hàng']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} 