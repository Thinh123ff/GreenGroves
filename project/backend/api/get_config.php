<?php
require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode([
    'googleClientId' => getenv('GOOGLE_CLIENT_ID')
]); 