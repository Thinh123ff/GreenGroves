<?php
session_start();

require __DIR__ . '/../project/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../project/');
$dotenv->load();

// Cấu hình Google OAuth
$client_id = getenv('GOOGLE_CLIENT_ID');
$client_secret = getenv('GOOGLE_CLIENT_SECRET');
$redirect_uri = 'https://greengroves.click/project/backend/auth/google_callback.php'; // VD: https://greengroves.click/project/backend/auth/google_callback.php

// Nếu chỉ lấy thông tin user (AJAX từ JS)
if (isset($_GET['get_user'])) {
    if (isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode([
            'name' => $_SESSION['user']['name'],
            'email' => $_SESSION['user']['email'],
            'picture' => $_SESSION['user']['picture']
        ]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(null);
    }
    exit;
}

// Đăng xuất
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $redirect_uri);
    exit;
}

// Nếu đã đăng nhập thì chuyển về trang chủ hoặc hiển thị tên
if (isset($_SESSION['user'])) {
    echo '<script>window.location.href = "/index.html";</script>';
    exit;
}

// Bước 1: Nếu chưa có mã code, chuyển hướng sang Google
if (!isset($_GET['code'])) {
    $auth_url = "https://accounts.google.com/o/oauth2/v2/auth?"
        . "scope=email%20profile"
        . "&access_type=online"
        . "&include_granted_scopes=true"
        . "&response_type=code"
        . "&redirect_uri=" . urlencode($redirect_uri)
        . "&client_id=" . $client_id;
    header('Location: ' . $auth_url);
    exit;
}

// Bước 2: Đã có mã code, lấy access token
$code = $_GET['code'];
$token_url = "https://oauth2.googleapis.com/token";
$data = [
    'code' => $code,
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'redirect_uri' => $redirect_uri,
    'grant_type' => 'authorization_code'
];

$options = [
    CURLOPT_URL => $token_url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded']
];

$ch = curl_init();
curl_setopt_array($ch, $options);
$response = curl_exec($ch);
curl_close($ch);

$token = json_decode($response, true);

if (isset($token['access_token'])) {
    // Bước 3: Lấy thông tin user từ Google
    $user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo";
    $opts = [
        CURLOPT_URL => $user_info_url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer " . $token['access_token']
        ]
    ];
    $ch = curl_init();
    curl_setopt_array($ch, $opts);
    $user_info = curl_exec($ch);
    curl_close($ch);

    $user = json_decode($user_info, true);

    // Lưu thông tin user vào session
    $_SESSION['user'] = $user;

    // Chuyển về trang chủ (hoặc trang index.html)
    echo '<script>window.location.href = "/index.html";</script>';
    exit;
} else {
    echo "Login failed!";
} 