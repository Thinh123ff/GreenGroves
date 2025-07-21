<?php
session_start();
file_put_contents(__DIR__ . '/session_debug.txt', print_r($_SESSION, true));
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://greengroves.click'); // Cho phép CORS từ frontend
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

// Kiểm tra nếu đã đăng nhập (AJAX từ JS)
if (isset($_GET['get_user'])) {
    if (isset($_SESSION['user'])) {
        echo json_encode([
            'name' => $_SESSION['user']['name'],
            'email' => $_SESSION['user']['email'],
            'picture' => $_SESSION['user']['picture']
        ]);
    } else {
        echo json_encode(null);
    }
    exit;
}

// Kết nối cơ sở dữ liệu
$servername = "localhost";
$username = "Thinh289746";
$password = "Thinh289746@";
$dbname = "greentools_db"; // Tên cơ sở dữ liệu

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Kết nối DB thất bại: ' . $e->getMessage()]);
    exit;
}

// Cài đặt thư viện Google Client
require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

use Google_Client;

$client = new Google_Client();
$client->setClientId(getenv('GOOGLE_CLIENT_ID'));
$client->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id_token = $data['id_token'] ?? '';

    if (empty($id_token)) {
        echo json_encode(['success' => false, 'message' => 'Không nhận được token']);
        exit;
    }

    try {
        // Xác minh token ID
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
            $user_id = $payload['sub']; // Google ID
            $email = $payload['email'];
            $name = $payload['name'];
            $picture = $payload['picture'] ?? '';

            // Kiểm tra người dùng trong DB
            $stmt = $conn->prepare("SELECT * FROM users WHERE google_id = ? OR email = ?");
            $stmt->execute([$user_id, $email]);
            $user = $stmt->fetch();

            if ($user) {
                // Cập nhật thông tin nếu cần
                $stmt = $conn->prepare("UPDATE users SET full_name = ?, picture = ?, updated_at = NOW() WHERE google_id = ?");
                $stmt->execute([$name, $picture, $user_id]);
            } else {
                // Tạo người dùng mới
                $stmt = $conn->prepare("INSERT INTO users (google_id, email, full_name, picture, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
                $stmt->execute([$user_id, $email, $name, $picture]);
            }

            // Lấy thông tin người dùng sau khi tạo/cập nhật
            $stmt = $conn->prepare("SELECT google_id AS id, email, full_name AS name, picture FROM users WHERE google_id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch();

            echo json_encode([
                'success' => true,
                'user' => $user
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Token không hợp lệ']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi xác minh token: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' =>ස

System: * Today's date and time is 10:02 PM +07 on Friday, July 11, 2025.