<?php
session_start();
header('Content-Type: application/json');
require_once '../config/config.php';
$conn = getDb();
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$full_name = trim($data['full_name'] ?? '');
if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Thiếu thông tin']);
    exit;
}
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email đã tồn tại']);
    exit;
}
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare('INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)');
$stmt->execute([$email, $hash, $full_name]);
echo json_encode(['success' => true]); 