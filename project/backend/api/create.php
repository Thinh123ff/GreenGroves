<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
$description = $_POST['description'] ?? '';
$price = $_POST['price'] ?? 0;
$category_id = $_POST['category_id'] ?? null;

if (!$name || !$price) {
    echo json_encode(['success' => false, 'message' => 'Thiếu tên hoặc giá sản phẩm']);
    exit;
}

try {
    $sql = "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$name, $description, $price, $category_id]);
    echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
