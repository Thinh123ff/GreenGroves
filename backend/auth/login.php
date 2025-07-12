<?php
session_start();
header('Content-Type: application/json');
require_once '../config/config.php';
$conn = getDb();
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Thiếu thông tin']);
    exit;
}
$stmt = $conn->prepare('SELECT id, email, password, full_name FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();
if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user'] = [
        'email' => $user['email'],
        'name' => $user['full_name'],
        'picture' => null
    ];
    echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Email hoặc mật khẩu không đúng']);
} 