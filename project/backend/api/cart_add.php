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
$quantity = $_POST['quantity'];

// Kiểm tra sản phẩm đã có trong giỏ chưa
$sql = "SELECT * FROM cart WHERE user_email=? AND product_id=?";
$stmt = $conn->prepare($sql);
$stmt->execute([$user_email, $product_id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    // Cập nhật số lượng
    $sql = "UPDATE cart SET quantity=? WHERE user_email=? AND product_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$quantity, $user_email, $product_id]);
} else {
    // Thêm mới
    $sql = "INSERT INTO cart (user_email, product_id, quantity) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user_email, $product_id, $quantity]);
}

echo json_encode(['success' => true]);
?> 