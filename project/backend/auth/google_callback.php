<?php
ini_set('session.cookie_path', '/');
session_start();

require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$client_id = getenv('GOOGLE_CLIENT_ID');
$client_secret = getenv('GOOGLE_CLIENT_SECRET');
$redirect_uri = 'https://greengroves.click/project/backend/auth/google_callback.php';

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    // Lấy access token
    $token_url = 'https://oauth2.googleapis.com/token';
    $data = [
        'code' => $code,
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri,
        'grant_type' => 'authorization_code'
    ];
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($token_url, false, $context);
    $response = json_decode($result, true);
    if (isset($response['access_token'])) {
        // Lấy thông tin users
        $access_token = $response['access_token'];
        $user_info = file_get_contents('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' . $access_token);
        $user = json_decode($user_info, true);
        // Lưu user vào session
        $_SESSION['user'] = $user;
        $_SESSION['user_email'] = $user['email'];
        // Chuyển về trang chủ
        header('Location: /index.html');
        exit;
    } else {
        echo "Lỗi xác thực Google!";
    }
} else {
    echo "Không có mã xác thực!";
} 