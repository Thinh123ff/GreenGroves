<?php
session_start();
$client_id = '1022441040470-fr7mdmd7jd4pkodqoc2gn2uc3p1lajpv.apps.googleusercontent.com';
$client_secret = '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';
$redirect_uri = 'http://localhost/project/project/backend/auth/google_callback.php';
if (isset($_GET['code'])) {
    $code = $_GET['code'];
    $token_url = 'https://oauth2.googleapis.com/token';
    $data = [
        'code' => $code,
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri . (isset($_GET['redirect']) ? ('?redirect=' . urlencode($_GET['redirect'])) : ''),
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
        $access_token = $response['access_token'];
        $user_info = file_get_contents('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' . $access_token);
        $user = json_decode($user_info, true);
        $_SESSION['user'] = [
            'name' => $user['name'],
            'email' => $user['email'],
            'picture' => $user['picture']
        ];
        $redirect = isset($_GET['redirect']) ? $_GET['redirect'] : 'index.html';
        header('Location: ' . $redirect);
        exit;
    } else {
        echo "Lỗi xác thực Google!";
    }
} else {
    echo "Không có mã xác thực!";
} 