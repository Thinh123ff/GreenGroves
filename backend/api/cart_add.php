<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user']['email'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}
$email = $_SESSION['user']['email'];
$product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;
if ($product_id <= 0 || $quantity <= 0) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    exit;
}
require_once '../../project/backend/config/config.php';
$conn = getDb();
// Kiểm tra sản phẩm đã có trong giỏ chưa
$stmt = $conn->prepare('SELECT id, quantity FROM cart WHERE user_email = ? AND product_id = ?');
$stmt->execute([$email, $product_id]);
$row = $stmt->fetch();
if ($row) {
    // Cập nhật số lượng
    $stmt = $conn->prepare('UPDATE cart SET quantity = quantity + ? WHERE id = ?');
    $stmt->execute([$quantity, $row['id']]);
} else {
    // Thêm mới
    $stmt = $conn->prepare('INSERT INTO cart (user_email, product_id, quantity) VALUES (?, ?, ?)');
    $stmt->execute([$email, $product_id, $quantity]);
}
echo json_encode(['success' => true]); 