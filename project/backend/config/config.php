<?php
// Cấu hình kết nối MySQL
$servername = "localhost";
$username = "Thinh289746";
$password = "Thinh289746@";
$dbname = "greentools_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $conn->exec("SET NAMES utf8");
    

} catch(PDOException $e) {
    die("Kết nối thất bại: " . $e->getMessage());
}
?>