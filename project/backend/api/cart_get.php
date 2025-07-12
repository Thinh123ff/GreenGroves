<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$user_id = $_GET['user_id'] ?? $_POST['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu user_id']);
    exit;
}

try {
    $sql = "SELECT cart.product_id, cart.quantity, products.name, products.price, products.description
            FROM cart
            JOIN products ON cart.product_id = products.id
            WHERE cart.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$user_id]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $items]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} 