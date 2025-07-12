<?php
session_start();
if (isset($_GET['get_user'])) {
    if (isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode($_SESSION['user']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(null);
    }
    exit;
} 