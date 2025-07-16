<?php
include_once '../config/config.php';

header('Content-Type: application/json');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Thiếu username hoặc password']);
    exit;
}

try {
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($password, $user['password'])) {
        // Xóa password trước khi trả về
        unset($user['password']);
        // Lưu vào session chuẩn Google login
        session_start();
        $_SESSION['user'] = [
            'email' => $user['email'],
            'name' => $user['full_name'] ?? $user['username'],
            'picture' => $user['picture'] ?? ''
        ];
        $_SESSION['user_email'] = $user['email']; // Thêm dòng này để đồng bộ với API giỏ hàng
        echo json_encode([
            'success' => true,
            'user' => [
                'email' => $user['email'],
                'name' => $user['full_name'] ?? $user['username'],
                'picture' => $user['picture'] ?? ''
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Sai tài khoản hoặc mật khẩu']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
