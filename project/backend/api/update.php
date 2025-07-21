<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? '';
$description = $_POST['description'] ?? '';
$price = $_POST['price'] ?? 0;
$category_id = $_POST['category_id'] ?? null;

if (!$id || !$name || !$price) {
    echo json_encode(['success' => false, 'message' => 'Thiếu id, tên hoặc giá sản phẩm']);
    exit;
}

try {
    $sql = "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$name, $description, $price, $category_id, $id]);
    echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
