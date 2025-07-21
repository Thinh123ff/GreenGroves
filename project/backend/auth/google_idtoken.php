<?php
include_once '../config/config.php';
require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_token'])) {
    $id_token = $_POST['id_token'];
    $client_id = getenv('GOOGLE_CLIENT_ID');

    // Gửi request xác thực tới Google
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $id_token;
    $response = file_get_contents($url);
    $user = json_decode($response, true);

    if (isset($user['email']) && $user['aud'] === $client_id) {
        session_start();
        // Kiểm tra user đã tồn tại chưa
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user['email']]);
        $dbUser = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$dbUser) {
            // Nếu chưa có, thêm user mới
            $sql = "INSERT INTO users (username, password, email, full_name, role) VALUES (?, '', ?, ?, 'user')";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                $user['email'], // username
                $user['email'],
                $user['name'] ?? ''
            ]);
            // Lấy lại user vừa thêm
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$user['email']]);
            $dbUser = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        $_SESSION['user'] = $dbUser;
        echo json_encode(['success' => true, 'user' => $dbUser]);
    } else {
        http_response_code(401);
        echo 'Xác thực Google thất bại!';
    }
} else {
    http_response_code(400);
    echo 'Thiếu id_token!';
} 