<?php
require_once 'databaseService.php';

$dataService = new DatabaseService();

header('Content-Type: application/json');
$data = array('key' => 'value', 'key2' => 'value2');
echo json_encode($data);

// echo '<pre>';
// var_dump($_SERVER);
// // exit();
// echo phpinfo();
// echo 'Goodbye, world!'.getenv('DB_NAME');
