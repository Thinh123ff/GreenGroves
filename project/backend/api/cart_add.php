<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$user_id = $_POST['user_id'] ?? null;
$product_id = $_POST['product_id'] ?? null;
$quantity = $_POST['quantity'] ?? 1;

if (!$user_id || !$product_id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu user_id hoặc product_id']);
    exit;
}

try {
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    $sql = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user_id, $product_id]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($item) {
        // Nếu đã có thì tăng số lượng
        $sql = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$quantity, $user_id, $product_id]);
    } else {
        // Nếu chưa có thì thêm mới
        $sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_id, $product_id, $quantity]);
    }
    echo json_encode(['success' => true, 'message' => 'Đã thêm vào giỏ hàng']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} 